$(()=>{
   "use strict";
   const reload = (()=>{
      window.location.href = window.location.href;
   });

  $('.edit').click(()=>{
      var m = $('.edit').val();
      $('#'+m).addClass('hidden');
      $.ajax({
         method: "GET",
         url: "http://localhost:5000/users/complete-schedule/"+m,
         //url: "https://ronewa-schedule-app.herokuapp.com/complete-schedule/"+m,
      })
         .done(()=> {
            $(document).ready(reload);
         });
   });

   $('.delete').click(()=>{
      var m = $('.delete').val();
      $('#'+m).addClass('hidden');
      $.ajax({
         method: "GET",
         url: "http://localhost:5000/users/delete-schedule/"+m,
         //url: "https://ronewa-schedule-app.herokuapp.com/complete-schedule/"+m,
      })
         .done(()=> {
            $(document).ready(reload);
         });
   });

   $('.radio').click(()=>{
      var m = $("input[type=radio][name=titles]:checked").val();
      $('#'+m).addClass('hidden');
      $.ajax({
         method: "GET",
         url: "http://localhost:5000/users/complete-schedule/"+m,
         //url: "https://ronewa-schedule-app.herokuapp.com/complete-schedule/"+m,
      })
         .done(()=> {
            $(document).ready(reload);
         });
   });

   $('.delete').click(()=>{
      var com = $("input[type=radio][name=delete]:checked").val();
      $('.'+com).addClass('hidden');
      var $container = $(this).closest('.formContainer');

      $.ajax({
         method: "GET",
         url: "http://localhost:5000/users/delete-schedule/"+com,
         //url: "https://ronewa-schedule-app.herokuapp.com/delete-schedule/"+com,
      })
         .done(()=> {
            $(document).ready(reload);
         });
   });

   $('.bb').click(()=>{
      var com = $("button[type=button][name=bb]:click").val();
      console.log(com);
   })

});

