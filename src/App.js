import React, { Component } from 'react';
import Card from 'react-credit-cards';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './utils';

import SupportedCards from './components/SupportedCards';

// Card CSS
import 'react-credit-cards/es/styles-compiled.css';

const styles = theme => ({
  root: {
    padding: 30
  },
  containerRoot: {
    flexGrow: 1
  },
  appTitle: {
    textAlign: 'center',
    marginBottom: 15
  },
  creditCardForm: {
    margin: `30px auto 0`,
    maxWidth: 400
  },
  creditCardDetails: {
    margin: `15px auto 0`,
    maxWidth: 400
  }
});

class App extends Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    numberError: false,
    nameError: false,
    expiryError: false,
    cvcError: false,
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  /**
   * Set Focused field to be highlighted in image
   */
  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  /**
   * Validation and setState on input data change
   */
  handleInputChange = ({ target }) => {
    let retObj = {};
    if (target.name === 'number') {
      retObj = formatCreditCardNumber(target.value);
      target.value = retObj.value; // input value

      this.setState({ numberError: retObj.error }); // set error flag 

    } else if (target.name === 'expiry') {
      retObj = formatExpirationDate(target.value);
      target.value = retObj.value;

      this.setState({ expiryError: retObj.error });
    } else if (target.name === 'cvc') {
      retObj = formatCVC(target.value, this.state.issuer);
      target.value = retObj.value;

      this.setState({ cvcError: retObj.error });
    }

    this.setState({ [target.name]: target.value }); // input value to display on image
  };

  /**
   * Process and display data on submit
   */
  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData, numberError, nameError, expiryError, cvcError } = this.state;
    const { classes } = this.props;
    let disableButton = true;

    if(!numberError && !nameError && !expiryError && !cvcError && name !== '' && number !== '' && expiry !== '' && cvc !== '') {
      disableButton = false;
    }
    return (
      <div key="Payment">
        <div className={classes.root}>

          <Typography variant="h2" className={classes.appTitle}>Enter Credit Card Details</Typography>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form className={classes.creditCardForm} ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className={classes.containerRoot}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth={true}
                    type="tel"
                    name="number"
                    label="Card Number"
                    required
                    autoFocus
                    autoComplete={`off`}
                    error={numberError}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    fullWidth={true}
                    variant="outlined"
                    name="name"
                    label="Name"
                    required
                    autoComplete={`off`}
                    error={nameError}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="tel"
                    variant="outlined"
                    name="expiry"
                    label="MM/YY"              
                    required
                    autoComplete={`off`}
                    error={expiryError}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="tel"
                    variant="outlined"
                    name="cvc"
                    label="CVC"          
                    required
                    autoComplete={`off`}
                    error={cvcError}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </Grid>

                <Grid item xs={12}>
                  <input type="hidden" name="issuer" value={issuer} />
                  <Button fullWidth={true} variant="contained" type="submit" color="primary" disabled={disableButton} className={`btn btn-primary btn-block`}>
                    PAY
              </Button>
                </Grid>
              </Grid>
            </div>
          </form>
          {formData && (
            <div className={classes.creditCardDetails}>
              {formatFormData(formData).map((dataValue, dataKey) => <div key={dataKey}>{dataValue}</div>)}
            </div>
          )}
          <hr style={{ margin: '30px 0' }} />

          {/* Displays list of rendered cards */}
          <SupportedCards />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
