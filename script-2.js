/* Some titles, preamble statements or words to prefix content with aka a string table */
const preamble = [
/*  0   */  "Delete",
/*  1   */  "Do you really want to know more about",
/*  2   */  "Info"
];

/* The active popOver-owning element, if any */
let activePop = null;

$(function () {
    // popovers Initialization of hard-coded popovers
    $('[data-toggle="popover"]').popover();

    // tooltips Initialization of hard-coded tooltips
    $('[data-toggle="tooltip"]').tooltip();

/* Set the tooltips and handlers for all of the items which have a 'deletePlayer' attribute */
    $('a[deletePlayer]').each( (index, el) => {
        let container = el.parentElement.parentElement;
        if(container.hasAttribute('player')) {
            $(el).click( (event) => {
                event.preventDefault();
                $(el).tooltip('dispose');   //Get rid of the tooltip lest it remain, preventing gc of the container
                container.remove();
            });
        }
        $(el).attr('title', `${preamble[0]} ${
            container.children[0].hasAttribute('playerName') ?
            container.children[0].innerText : ''}`);    
        $(el).attr('data-toggle', 'tooltip');
        $(el).tooltip();         //(re)initialize the tooltip
    });

/* Set the popovers for all of the items which have a 'statement' attribute */
    $('a[statement]').each( (index, el) => {
        let pin = +($(el).attr("preamble"));
        let str = `${isNaN(pin) ? '' : (pin >= preamble.length ? '' : preamble[pin])}`;
        str += ` ${el.innerText}`;
        $(el).attr('title', preamble[2]);
        $(el).attr('data-content', str);    
        $(el).attr('data-toggle', 'popover');
        $(el).attr('data-trigger', 'focus');
        $(el).attr('data-placement', 'top');
        $(el).click((event) => {
            $(event.target).popover('show');
        })
        $(el).on('inserted.bs.popover', () => {        //Let's let the timeout hide itself after an interval
            activePop = el;     //Set the active popover
            window.setTimeout(()=> {
                if(activePop){
                    $(activePop).popover('hide');
                }
                activePop = null;
            }, 1000);
        });
        $(el).popover();        //(re)initialize the popover
    });
});



