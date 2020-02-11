

let svgDiv = null;
const tstData = [
    { title:'GEL', color: '#902'},
    { title:'M&P', color: '#398'},
    { title:'BOB', color: '#369'},
    { title:'DPT', color: '#9ac335'},
]

let manager = {
    bubbles: null,
    initialize() {
        console.log('test')
        this.bubbles = d3.select('#canvas').append('g')
            .attr("id", "bubbleG");
    
        this.render()
    },
    render() {
        let x=50;
        let tis = this.bubbles.selectAll('circle').data(tstData);

        tis.exit().remove();

        tis.enter().append('circle')
            .attr("cy", 75)
            .attr("cx", (d, i)=> (i+1) * x)
            .attr("r", 15)
            .attr("fill", d => d.color);
    }

}


document.addEventListener('DOMContentLoaded', event => {
    svgDiv = document.getElementById("#canvas");
    manager.initialize();
})

