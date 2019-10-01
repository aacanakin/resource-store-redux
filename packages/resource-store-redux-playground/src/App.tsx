import React from "react";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { Provider, connect } from "react-redux";
import configureStore, { StoreState } from "./configureStore";
import { resourceSelectors } from "resource-store-redux";
import { Resource } from "./Api";
import { ThunkDispatch } from "redux-thunk";

const useStyles = makeStyles(theme => ({
	gridItem: {
		margin: theme.spacing(2)
	},
	paper: {
		padding: theme.spacing(2)
	}
}));

type FormProps = FormContainerStateProps & FormContainerDispatchProps & FormContainerOwnProps

const Form: React.FC<FormProps> = (props: FormProps) => {
	const { onSubmit, response } = props;
	const classes = useStyles();

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		onSubmit()
	}

	return (
		<form autoComplete="off" onSubmit={handleSubmit}>
			<Grid container direction="column">
				<Button type="submit">{props.name}</Button>
				<Paper className={classes.paper}>
					<Typography variant="h5" component="h3">
						Response
					</Typography>
					<Typography component="p">{response}</Typography>
				</Paper>
			</Grid>
		</form>
	);
};

const { store, requestResource } = configureStore();

interface FormContainerOwnProps {
	resource: Resource
	name: string
}

interface FormContainerStateProps {
	response?: string
}

interface FormContainerDispatchProps {
	onSubmit: (form?: any) => void;
}

const mapStateToProps = (state: StoreState, ownProps: FormContainerOwnProps): FormContainerStateProps => {
	const data = resourceSelectors.hasError(state.resources, ownProps.resource) ?
		resourceSelectors.getError(state.resources, ownProps.resource) :
		resourceSelectors.getData(state.resources, ownProps.resource)

	return {
		response: JSON.stringify(data, null, 2),
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, any, any>, ownProps: FormContainerOwnProps): FormContainerDispatchProps => ({
	onSubmit: (form: any) => {
		dispatch(requestResource(ownProps.resource, form))
	}
})

export const FormContainer = connect<FormContainerStateProps, FormContainerDispatchProps, FormContainerOwnProps, StoreState>(
	mapStateToProps, mapDispatchToProps
)(Form)

const App: React.FC = () => {

	const classes = useStyles();

	return (
		<Provider store={store}>
			<Grid container direction="row" justify="center" alignItems="center">
				<Grid item xs={6} className={classes.gridItem}>
					<FormContainer resource={Resource.SampleGet} name="sample get" />
				</Grid>
				<Grid item xs={6} className={classes.gridItem}>
					<FormContainer resource={Resource.SamplePost} name="sample post" />
				</Grid>
				<Grid item xs={6} className={classes.gridItem}>
					<FormContainer resource={Resource.SampleFailure} name="sample failure" />
				</Grid>
			</Grid>
		</Provider>
	);
};

export default App;
