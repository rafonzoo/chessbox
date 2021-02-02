import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const BackButton = () => {
  const goBack = () => window.history.go(-1);
  const makeItFixedTop = {
    position : 'absolute',
    top      : '10px',
    left     : 0,
  }

  return (
    <IconButton
      style={makeItFixedTop}
      onClick={goBack}
      color="primary"
      aria-label="Back"
      disableRipple
    >
      <ArrowBackIcon style={{ fontSize: 30 }} />
    </IconButton>
  );
}