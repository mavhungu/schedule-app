(()=>{
    "use strict";
    $(".app-sidebar_toggle").click((event)=>{
        event.preventDefault();
        $(".app").toggleClass("app-slidebar-toggled");
    });
})();