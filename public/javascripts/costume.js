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

        //$(".app-aside").removeClass("col-md-2").toggleClass("col-md-1");
    });
})();