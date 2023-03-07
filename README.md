in this project we have two page :: 
page 1: include header and add user section and user list section
page 2: include header and edit user section

 main page inclue fields of below:
 name: user can enter any value
 last name: user can enter any value
 father name: user can enter any value
 mobile number: user should enter 11 digit number 
 education level(drop down input): {[1: دیپلم], [2: لیسانس]}
 university: this field should show if user select value 2 of education level

after insert user, new user should be show in list
if user want to edit record should be redirect to info page with this address -> info/:id/
in info page first of all get received user and fill related field and then user can save new changes and after save changes return to main page

-----------------------------------------------------------------------------------------------------------------------------------------------------
all form should manage with formik
use Yup validation library for form validation
use axios and react query for http request
all fields of form in new and edit is mandatory except university, university is mandatory if education level select "لیسانس"
show validation error in below of related field
list without pagination
project should develop with typescript
can use css module for styling


good ui/ux is plus
use scss is plus
use reactstrap for gridview is plus



*wire frame : https://wireframepro.mockflow.com/view/MRRvJaLp8h

*use below api
  *CREATE USER INFO - ( POST REQUEST ) https://6249e521fd7e30c51c085463.mockapi.io/api/info
    **{ "name": "", "lastname": "", "fatherName": "", "phoneNumer": "", "grade": 1, // [1 , 2 ] "university": "" }

  *GET LIST - ( GET REQUEST) https://6249e521fd7e30c51c085463.mockapi.io/api/info

  *GET BY ID - ( GET REQUEST ) https://6249e521fd7e30c51c085463.mockapi.io/api/info/:id

  *UPDATE BY ID - ( PUT REQUEST ) https://6249e521fd7e30c51c085463.mockapi.io/api/info/:id
  
  
after complete you'r task email your project to dadehkav.dehghan.tabarestan@gmail.com

**Good luck**
