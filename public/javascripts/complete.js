$(()=>{
   "use strict";
   const reload = (()=>{
      window.location.href = window.location.href;
   });
   $('.radio').click(()=>{
      var m = $("input[type=radio][name=titles]:checked").val();
      $('#'+m).addClass('hidden');
      $.ajax({
         method: "GET",
         //url: "http://localhost:5000/complete-schedule/"+m,
         url: "https://ronewa-schedule-app.herokuapp.com/complete-schedule/"+m,
      })
          .done(()=> {
             $(document).ready(reload);
          });
   });

   $('.delete').click(()=>{
      var com = $("input[type=radio][name=delete]:checked").val();
      $('.'+com).addClass('hidden');
      console.log("delete clicked");

      $.ajax({
         method: "GET",
         //url: "http://localhost:5000/delete-schedule/"+com,
         url: "https://ronewa-schedule-app.herokuapp.com/delete-schedule/"+com,
      })
          .done(()=> {
             $(document).ready(reload)
          });
   });
});

