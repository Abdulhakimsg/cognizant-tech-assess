import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useCustomStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 24,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: '#FFFFFF',
      alignSelf: 'center',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
);

export default useCustomStyles;
