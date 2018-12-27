import React from 'react';
import Card from 'react-credit-cards';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    topicTitle: {
        textAlign: 'center',
        marginBottom: 15
    },
    cardsList: {
        display: `flex`,
        marginTop: 30,
        flexWrap: `wrap`,
        justifyContent: `space-between`
    }
});
class SupportedCards extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h2" className={classes.topicTitle} >Supported Cards</Typography>
                <div className={classes.containerRoot}>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <Card
                                name="Harsh Makani"
                                number="4111 1111 1111 1111"
                                expiry="10/20"
                                cvc="737"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Card
                                name="Harsh Makani"
                                number="3700 0000 0000 002"
                                expiry="10/20"
                                cvc="737"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Card
                                name="Harsh Makani"
                                number="5555 4444 3333 1111"
                                expiry="10/20"
                                cvc="737"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Card
                                name="Harsh Makani"
                                number="3400 0000 0000 002"
                                expiry="10/20"
                                cvc="737"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Card
                                name="Harsh Makani"
                                number="6011 6011 6011 6611"
                                expiry="10/20"
                                cvc="737"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Card
                                name="Harsh Makani"
                                number="5066 9911 1111 1118"
                                expiry="10/20"
                                cvc="737"
                            />
                        </Grid>                         
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SupportedCards)
