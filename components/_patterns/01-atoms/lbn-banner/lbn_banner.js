(function ($, Drupal) {
    if (window.location.pathname == '/connect-longhorn-business-network') {
        let mobileBanner = "/modules/custom/txex_lbn/images/Dividends-320x50.gif";
        let desktopBanner = "/modules/custom/txex_lbn/images/Dividends-728x90.gif";
        document.getElementById('lbn__heading').parentElement.style.textAlign = 'center';
        if (window.innerWidth > 767) {
            console.log("Not mobile");
            document.getElementById('lbn__heading').insertAdjacentHTML('beforebegin', `<a href="https://www.texasmutual.com/employers/on-the-job/overarching?utm_source=UT-Texas+Exes-LBN&utm_medium=Banner&utm_campaign=LBN&utm_id=UT-Texas+Exes-LBN"><img src=${desktopBanner} alt="texas mutual ad" style="margin-top: 3%; margin-bottom: 3%;" /></a>`);
        } else {
            console.log("mobile");
            document.getElementById('lbn__heading').insertAdjacentHTML('beforebegin', `<a href="https://www.texasmutual.com/employers/on-the-job/overarching?utm_source=UT-Texas+Exes-LBN&utm_medium=Banner&utm_campaign=LBN&utm_id=UT-Texas+Exes-LBN"><img src=${mobileBanner} alt="texas mutual ad" style="margin-top: 5%; margin-bottom: 2%;" /></a>`);
        }
        console.log("Hello LBN Network");
    }
}(jQuery, Drupal));