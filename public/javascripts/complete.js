$(()=>{
   "use strict";
   $('.radio').click(()=>{
      var m = $("input[type=radio][name=titles]:checked").val();
      $('#'+m).addClass('hidden');
      $.ajax({
         method: "GET",
         //url: "http://localhost:3000/delete-schedule/"+m,
         url: "https://ronewa-schedule-app.herokuapp.com/delete-schedule/"+m,
      })
          .done(()=> {
             $(document).ready(me)
          });
      var me = (()=>{
         $.ajax({
            method: "GET",
            //url: "http://localhost:3000/",
            url: "https://ronewa-schedule-app.herokuapp.com/"
         })
      })
   });
});

