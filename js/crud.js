$(function() {
	Parse.initialize("DpdBXQYnm4ws0Ou0fejJ5yKS7f9VGNDgSax0Hppx", "0XdtaZ0twcsn27QVXRbHNqMIVBYgFGAhhutrbEz9");
	 
	var Review = Parse.Object.extend('Review');

	$('#stars').raty({ path: 'raty-2.7.0/lib/images'});
	
	var totalStars = 0;
	var reviewCount = 0;
	var average = 0;

	// Click event when form is submitted
	$('form').submit(function() {
		var review = new Review();
		review.set("title", $('#title').val());
		review.set("review", $('#review').val());
		review.set("stars", $('#stars').raty("score"));
		review.save(null, {
			success:getData
		});
		return false;
	});

	// Write a function to get data
	var getData = function() {
		var query = new Parse.Query(Review);
		
		query.find({
			success:function(d) {
				buildList(d)
			} 
		})
	}

	// A function to build your list
	var buildList = function(data) {
		// Empty out your ordered list
		$('ol').empty()

		// Loop through your data, and pass each element to the addItem function
		data.forEach(function(d){
			addItem(d);
		})
	}

	// This function takes in an item, adds it to the screen
	var addItem = function(item) {
		// Get parameters (website, band, song) from the data item passed to the function
		
		var revTitle = item.get('title');
		var revDescrip = item.get('review');
		var numStars = item.get('stars');
		
		totalStars += numStars;
		reviewCount++;
		
		
		
		//rating set to '0 stars' if user does not input a star rating
		if(numStars == undefined){
			numStars = 0;
		}
		
		var div = $('<div class = well well-sm><h3>' + revTitle + '</h3><br>' + revDescrip + '</div>');
		
		// Append li that includes text from the data item
		var li = $('<li></li>');
		// Create a button with a <span> element (using bootstrap class to show the X)
		var button = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>');
		
		// Click function on the button to destroy review (for easy removal from parse - remove this part from final version)
		button.click(function() {
			item.destroy({
				success:getData
			})
		})

		//display stars of the review
		var divStar = $("<div id = 'divStar'></div>");
		var revStar = divStar.raty({score: numStars});
		
		// Append everything to list of reviews
		div.prepend(revStar);
		div.append(button);
		li.append(div);
		$('ol').prepend(li);
		
	}
	
	console.log(totalStar);
	average = totalStars / reviewCount;
	// Call your getData function when the page loads
	getData();
});
