// Initialize Parse app
Parse.initialize('HtKubZVudSzKNOnixFISAnyPKPw1UPsdYRsS16nd', 'mcZIZX3g3KHK1VSqgWoYDRf041IJlUGPWlDuiBwJ');

var Crud = Parse.Object.extend('Crud');


// Click event when form is submitted
$('form').submit(function() {
 
	var crud = new Crud();

	// For each input element, set a property of your new instance equal to the input's value
	$(this).find('input').each(function(){
		review.set($(this).attr('id'), $(this).val());
		$(this).val('');
	})

	// After setting each property, save your new instance back to your database
	crud.save(null, {
		success:getData;
	})
	return false
})



// Write a function to get data
var getData = function() {
	
	var query = new Parse.Query(Crud)

}