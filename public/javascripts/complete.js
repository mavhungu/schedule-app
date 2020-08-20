$(()=>{
   "use strict";
   $('.radio').click(()=>{
      var m = $("input[type=radio][name=titles]:checked").val();
      $('#'+m).addClass('hidden');
      $.ajax({
         method: "GET",
         url: "http://localhost:3000/complete-schedule/"+m,
         //url: "https://ronewa-schedule-app.herokuapp.com/complete-schedule/"+m,
      })
          .done(()=> {
             $(document).ready(me)
          });
      var me = (()=>{
         $.ajax({
            method: "GET",
            url: "http://localhost:3000/",
            //url: "https://ronewa-schedule-app.herokuapp.com/"
         })
      })
   });

   $('.delete').click(()=>{
      var com = $("input[type=radio][name=delete]:checked").val();
      $('.'+com).addClass('hidden');
      console.log("delete clicked");

      $.ajax({
         method: "GET",
         url: "http://localhost:3000/delete-schedule/"+com,
         //url: "https://ronewa-schedule-app.herokuapp.com/delete-schedule/"+com,
          cache : false,
          success : function (data) {
         // data is the object that you send form the server by
         // res.jsonp();
         // here data = {success : true}
         // validate it
         if(data['success']){
            alert("message you want to show");
         }
      },
      error : function () {
         // some error handling part
         alert("Oops! Something went wrong.");
      }
      })
          .done(()=> {
             $(document).ready(me)
          });
      var me = (()=>{
         $.ajax({
            method: "GET",
            url: "http://localhost:3000/completed-schedules",
            //url: "https://ronewa-schedule-app.herokuapp.com/completed-schedules"
         })
      })

   });
});

