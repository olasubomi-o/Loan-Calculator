//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults,2000);

    e.preventDefault();
});

//Calculate Results

function calculateResults(){
    console.log('Calulating')
    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value); ///turns it to decimal
    const calulatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    //display monthly payment

    const x = Math.pow(1+calulatedInterest, calculatedPayments);
    const monthly = (principal*x*calulatedInterest)/(x-1);

    if( isFinite(monthly)){
        
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments). toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)- principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    }else{
    
       showError('Please check your numbers')
    }

    
    //use e.prevent default when a click would redirect or submit
}

//Show Error

function showError(error){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv,heading);

    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove()
}