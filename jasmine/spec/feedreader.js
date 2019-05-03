/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    describe('RSS Feeds', function() {
        /* A test to make sure that the allFeeds variable has been defined
         * and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            for(feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toEqual(0);
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have Names', function() {
            for(feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toEqual(0);
            }
        });
    });

    describe('The menu', function() {
        /* A test that ensures the menu element is hidden by default. */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('changes visibility when clicked', function() {
            const menuicon = document.querySelector('.menu-icon-link');

            //trigger first click (to open)
            menuicon.click();
            expect($('body').attr('class')).toBe('');

            //trigger another click (to hide)
            menuicon.click();
            expect($('body').attr('class')).toBe('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('has at least a single entry in the .feed container', function(done) {
            expect($('.feed .entry').length).not.toEqual(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let oldFeedContent,
            newFeedContent;
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeedContent = $('.feed').html();
                loadFeed(1, function() {
                    newFeedContent = $('.feed').html();
                    done();
                });
            });
        });

        it('content actually changes when a new feed is loaded', function(done) {
            expect(oldFeedContent).not.toEqual(newFeedContent);
            done();
        });
    });
}());