var removeCity = function () {
					$('.remove').on('click',function(){
								$(this).parent().remove();
							});
				}

				// Creare lista cu orase
				var newUlAppended = $("<ul></ul>");
				$('.city-container').append(newUlAppended);
				// counter = 0;
				$('.add').on('click',function(){
					var cityName = $('#inputfield').val();
					var firstPromise = $.ajax('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',uk&appid=3f8ad6ebd197587b8c999d2b1a470e62').then(function(data){
						var cityTemp = data.main.temp - 273.15;
						var newLiAppended = $("<li>" + cityName + " : " + parseInt(cityTemp) + " °C" + "</li>");
						newUlAppended.append(newLiAppended);
						newLiAppended.addClass('city');
						var newButtonAppended = $("<Button><span>X</span></button>");
						newLiAppended.append(newButtonAppended);
						newButtonAppended.addClass('remove');
						
						//Stergere din lista
						removeCity();

						//Adaugare Forecast - 7 days
						$('.city').on('click',function(){
							var newDivAppended = $("<div></div>");
							newDivAppended.addClass('forecast-7days');
							$(this).append(newDivAppended);
						
							var secondPromise = $.ajax('http://api.openweathermap.org/data/2.5/forecast/daily?q==' + cityName +'&units=metric&cnt=7&appid=b1b15e88fa797225412429c1c50c122a').then(function(info){
									var arr = info.list;
									var forecastUl = $("<ul></ul>");
									forecastUl.addClass('forecast-ul');
									$('.forecast-7days').append(forecastUl);
									arr.forEach(function(item){
										var dayTemp = item.temp.day;
										var nightTemp = item.temp.night;
										console.log(nightTemp);
										
										var forecastLi = $("<li></li>");
										var firstSpan = $("<span>" + parseInt(dayTemp) + "</span>");
										firstSpan.addClass('first-span');
										forecastLi.append(firstSpan);

										var secondSpan = $("<span>" + parseInt(nightTemp) + "</span>");
										secondSpan.addClass('second-span');
										forecastLi.append(secondSpan);

										forecastLi.addClass('forecast-li');
										forecastUl.append(forecastLi);
									});
									$(".first-span").before("<img src='day.png' class='day-img' />");
									$(".second-span").before("<img src='night.png' class='night-img' />");
							});
						});


					});	
				});

				//animatie
				$(document).ready(function(){	
	
				  makeRain();
				  setInterval(function(){  
				      makeRain();
				  }, 6000);	
				});


				function rain(){
				   $('body').addClass("rain");
				   setTimeout(function(){	
				   	   $("#lightning").show();
				       setTimeout(function(){	
				           $("#lightning").css({opacity:0.2});
				                 setTimeout(function(){	           
				                 		$("#lightning").css({opacity:0.8});
				                 		setTimeout(function(){	
				                        $("#lightning").hide();
				                    }, 100);             
				                  }, 100);                        
				       }, 100);
				   }, 1200);
					 $('#sun').addClass("animatepos1"); 	
				   $("html body").animate({ backgroundColor: "#000000" }, 1000);  
						$('#cloud-wrapper').removeClass("animate2").addClass('animate');		
						setTimeout(function(){			
							$('#sun').removeClass("animatepos1").addClass("animatepos2");
							setTimeout(function(){$('#rain-mask').addClass("animate");}, 700);			
						}, 400);
					}
					
				function sunny(){		
				    $('body').removeClass("rain");
						$('#open-cloudR, #open-cloudL').css('stroke-dashoffset', 400);		
						$('#cloud-wrapper').addClass("animate2");
						setTimeout(function(){	
							$('#sun').removeClass("animatepos2").addClass("animatepos1");
							setTimeout(function(){
								$('#sun').removeClass("animatepos1");        
				        $('#open-cloudR, #open-cloudL').css('stroke-dashoffset', 0);
				        $('#rain-mask').removeClass("animate");
							}, 400);		
						}, 300);
					}

				function makeRain(){
				  	rain();
				     setTimeout(function(){							
				       sunny();
				     }, 2600);
				}