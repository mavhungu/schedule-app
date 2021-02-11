(()=>{
    "use strict";
    $(".app-sidebar_toggle").click((event)=>{
        event.preventDefault();
        $(".app").toggleClass("app-slidebar-toggled");
    });

    $(".aside_minimise").click((event)=>{
        event.preventDefault();
        setTimeout(()=>{
            $(".app-aside").toggleClass("aside_minimise");
            $(".lead_info").toggleClass("aside_lead_hide");
            $(".lead_chevron").toggleClass("lead_chevron_hide");
            $(".aside_minis").toggleClass("hide");
        },1000);
    });
    $(".test").click((event)=>{
        event.preventDefault();
        //console.log("ronewa");
        $(".collapseOnes").on("shown.bs.collapse"), function() {
            console.log("ronewa");
            $(".servicedrop").addClass("fa-chevron-up").removeClass("fa-chevron-down");
        };
        $(".collapseOnes").on("hidden.bs.collapse"), function() {
            $(".servicedrop").addClass("fa-chevron-down").removeClass('fa-chevron-up');
        }
    });
})();