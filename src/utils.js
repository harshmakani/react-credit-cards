import Payment from 'payment';

/**
 * Replace all characters other than numbers
 * @param {*} inValue - Input value
 */
function clearNumber(inValue = '') {
    return inValue.replace(/\D+/g, '');
}

/**
 * Format and validate credit card number
 * @param inValue - Input value
 */
export function formatCreditCardNumber(inValue) {
    let retObj = {};

    if (!inValue) {
        retObj.error = true;
        retObj.value = inValue;
        return retObj;
    }
    
    let valid = Payment.fns.validateCardNumber(inValue); // validate credit card number
    if (!valid) {
        retObj.error = true; 
    }

    const clearValue = clearNumber(inValue); 

    retObj.value = Payment.fns.formatCardNumber(clearValue); // format credit card number

    return retObj;
}

/**
 * Format and validate CVC
 * @param inValue - Input value
 * @param issuer - Type of credit card (amex, visa, etc.)
 */
export function formatCVC(inValue, inIssuer) {
    let retObj = {};
    const clearValue = clearNumber(inValue);
    
    const maxLength = 4; // max length of CVC (in our case amex=4)

    let valid = Payment.fns.validateCardCVC(clearValue, inIssuer); // validate cvc
    if (!valid || clearValue.length < 3) {
        retObj.error = true;
    }

    retObj.value = clearValue.slice(0, maxLength); // input will be restricted to 4 digits
    return retObj;
}

/**
 * Format and validate expiry date
 * @param inValue - Input value
 */
export function formatExpirationDate(inValue) {
    let retObj = {};
    const clearValue = clearNumber(inValue);
    retObj.value = clearValue;

    if (clearValue.length >= 3) {
        retObj.value = `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;

        if (clearValue.length === 4) {
            let valid = Payment.fns.validateCardExpiry(clearValue.slice(0, 2), clearValue.slice(2, 4)); // check if correct expiry date
            if (!valid) {
                retObj.error = true;
            }
        } else {
            retObj.error = true;
        }
    } else {
        retObj.error = true;
    }
    return retObj;
}

/**
 * Format the credit card submitted data
 * @param inData - Input data
 */
export function formatFormData(inData) {
    return Object.keys(inData).map(data => `${data}: ${inData[data]}`);
}
