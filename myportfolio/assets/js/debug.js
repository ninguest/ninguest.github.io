// Portfolio Debugging and Fixes
window.portfolioDebug = {
    checkIsotope: function() {
        console.log('Checking Isotope...');
        console.log('Isotope available:', typeof Isotope !== 'undefined');
        console.log('Portfolio container:', document.querySelector('.portfolio-container'));
        console.log('Portfolio filters:', document.querySelectorAll('#portfolio-flters li').length);
        console.log('Portfolio items:', document.querySelectorAll('.portfolio-item').length);
    },
    
    checkBackToTop: function() {
        console.log('Checking back to top button...');
        const btn = document.querySelector('.back-to-top');
        console.log('Button found:', !!btn);
        if (btn) {
            console.log('Button classes:', btn.classList.toString());
            console.log('Button visible:', window.getComputedStyle(btn).visibility);
            console.log('Button opacity:', window.getComputedStyle(btn).opacity);
        }
    },
    
    testBackToTop: function() {
        const btn = document.querySelector('.back-to-top');
        if (btn) {
            btn.click();
        }
    },
    
    testPortfolioFilter: function(filter) {
        const filterBtn = document.querySelector(`[data-filter="${filter || '*'}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
};

// Auto-run checks after page load
window.addEventListener('load', function() {
    setTimeout(() => {
        console.log('=== Portfolio Debug Info ===');
        window.portfolioDebug.checkIsotope();
        window.portfolioDebug.checkBackToTop();
    }, 2000);
});
