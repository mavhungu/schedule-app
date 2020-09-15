(()=>{
    "use strict";
    $(".app-sidebar_toggle").click((event)=>{
        event.preventDefault();
        $(".app").toggleClass("app-slidebar-toggled");
    });
    $(".aside_minimise").click((event)=>{
        event.preventDefault();
        $(".app-aside").toggleClass("aside_minimise");
        $(".lead_info").toggleClass("aside_lead_hide");
        $(".lead_chevron").toggleClass("lead_chevron_hide");
        $(".aside_minis").toggleClass("hide");

    });
    /*$(".aside_minimise").click((event)=>{
        event.preventDefault();
        //console.log("fa-step-backward clicked");

        $(".fa-step-forward").show();
        $(".fa-step-backward").hide();


    })*/

})();