(function ($, Drupal) {
    if (window.location.pathname == '/connect-longhorn-business-network') {
        let mobileBanner = "/modules/custom/txex_lbn/images/Dividends-320x50.gif";
        let desktopBanner = "/modules/custom/txex_lbn/images/Dividends-728x90.gif";
        document.getElementById('lbn__heading').parentElement.style.textAlign = 'center';
        if (window.innerWidth > 767) {
            console.log("Not mobile");
            document.getElementById('lbn__heading').insertAdjacentHTML('beforebegin', `<a href="https://www.texasmutual.com/employers/pr/dividend-program?utm_source=UT+LBN&utm_medium=Digital&utm_campaign=Dividends&utm_id=EMP+Dividendss"><img src=${desktopBanner} alt="texas mutual ad" style="margin-top: 3%; margin-bottom: 3%;" /></a>`);
        } else {
            console.log("mobile");
            document.getElementById('lbn__heading').insertAdjacentHTML('beforebegin', `<a href="https://www.texasmutual.com/employers/pr/dividend-program?utm_source=UT+LBN&utm_medium=Digital&utm_campaign=Dividends&utm_id=EMP+Dividendss"><img src=${mobileBanner} alt="texas mutual ad" style="margin-top: 5%; margin-bottom: 2%;" /></a>`);
        }
        console.log("Hello LBN Network");
    }
}(jQuery, Drupal));