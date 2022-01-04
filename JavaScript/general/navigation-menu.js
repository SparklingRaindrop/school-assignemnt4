export default function createNavigationMenu(){
    let screenWidth = $(document.body).width();
    let screenBreakPoint = 700;
    const menu = $("#menu ul");
    const iconHamburger = $("#iconHamburger");
    const iconCross = $("#iconCross");

    initialize();

    function initialize(){
        iconHamburger.click(openMenu);
        iconCross.click(closeMenu);
        menuManager();
        $(window).resize(menuManager);
    }

    function openMenu(){
        iconHamburger.hide();
        iconCross.show();
        menu.show();
        $('#menu').addClass('opened');
    }
    function closeMenu(){
        $('#menu').removeClass('opened');
        iconCross.hide();
        iconHamburger.show();
        menu.hide();
    }
    
    function menuManager(){
        screenWidth = $(document.body).width();
        /* This condition is for when user leaves/resizes when menu is opened. */
        if ($('#menu').is('.opened')){
            closeMenu();
        }
        
        const isLargeScreen = screenWidth > screenBreakPoint;
        if(isLargeScreen){
            if ($('#menu').hasClass('mobile-menu')) {
                $('#menu').removeClass('mobile-menu');
            }
            $('#menu').addClass('desktop-menu');
        }else {
            if ($('#menu').hasClass('desktop-menu')) {
                $('#menu').removeClass('desktop-menu');
            }
            $('#menu').addClass('mobile-menu');
        }
    }
}
