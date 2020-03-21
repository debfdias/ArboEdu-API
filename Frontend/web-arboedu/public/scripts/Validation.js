function loadDist()
{
	var divid = $('#divisions').val();
	//alert(divid);
	
	$.ajax({
		url: 'http://localhost/ci226/ajax/getDistList',
		data: {did: divid},
		success: function(result){
			$('#districts').html(result);
		}
	});
}

function validateForm() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var Repassword = document.getElementById("Repassword").value;
	var FullName = document.getElementById("FullName").value;
	var PhoneNo = document.getElementById("PhoneNo").value;
	
	var usernameN = document.getElementById("username").name;
	var passwordN = document.getElementById("password").name;
	var RepasswordN = document.getElementById("Repassword").name;
	var FullNameN = document.getElementById("FullName").name;
	var PhoneNoN = document.getElementById("PhoneNo").name;

	if(validateBlank(username,usernameN) && validateBlank(password,passwordN) && validateBlank(FullName,FullNameN) &&validateBlank(PhoneNo,PhoneNoN))
	{
		
		
		return true;
	}
	else
	{
		
		return false;
	}
}




function validateBlank(from,name)
{
	if(from=="")
	{
		alert(name+"Field is Empty");
		return false;
	}
	else
	{
		return true;
	}
}

function validateTo(to)
{
	if(to=="")
	{
		return false;
	}
	else
	{
		return true;
	}
}
