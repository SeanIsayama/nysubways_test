import { c as create_ssr_component, d as add_attribute, e as escape, f as each, v as validate_component } from "../../chunks/ssr.js";
import * as d3 from "d3";
import { scaleUtc, extent, scaleLinear } from "d3";
import mapboxgl from "mapbox-gl";
import { geoMercator } from "d3-geo";
import { select } from "d3-selection";
import "d3-transition";
const css$4 = {
  code: "svelte-scroller-outer.svelte-1yjh2jm{display:block;position:relative}svelte-scroller-background.svelte-1yjh2jm{display:block;position:relative;width:100%}svelte-scroller-foreground.svelte-1yjh2jm{display:block;position:relative;z-index:2}svelte-scroller-foreground.svelte-1yjh2jm::after{content:' ';display:block;clear:both}svelte-scroller-background-container.svelte-1yjh2jm{display:block;position:absolute;width:100%;max-width:100%;pointer-events:none;will-change:transform}",
  map: null
};
const handlers = [];
if (typeof window !== "undefined") {
  const run_all = () => handlers.forEach((fn) => fn());
  window.addEventListener("scroll", run_all);
  window.addEventListener("resize", run_all);
}
if (typeof IntersectionObserver !== "undefined") {
  const map = /* @__PURE__ */ new Map();
  new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const update = map.get(entry.target);
        const index = handlers.indexOf(update);
        if (entry.isIntersecting) {
          if (index === -1)
            handlers.push(update);
        } else {
          update();
          if (index !== -1)
            handlers.splice(index, 1);
        }
      });
    },
    {
      rootMargin: "400px 0px"
      // TODO why 400?
    }
  );
}
const Scroller = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let widthStyle;
  let { top = 0 } = $$props;
  let { bottom = 1 } = $$props;
  let { threshold = 0.5 } = $$props;
  let { query = "section" } = $$props;
  let { parallax = false } = $$props;
  let { index = 0 } = $$props;
  let { count = 0 } = $$props;
  let { offset = 0 } = $$props;
  let { progress = 0 } = $$props;
  let { visible = false } = $$props;
  let outer;
  let foreground;
  let background;
  let offset_top = 0;
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  if ($$props.bottom === void 0 && $$bindings.bottom && bottom !== void 0)
    $$bindings.bottom(bottom);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0)
    $$bindings.threshold(threshold);
  if ($$props.query === void 0 && $$bindings.query && query !== void 0)
    $$bindings.query(query);
  if ($$props.parallax === void 0 && $$bindings.parallax && parallax !== void 0)
    $$bindings.parallax(parallax);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.progress === void 0 && $$bindings.progress && progress !== void 0)
    $$bindings.progress(progress);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  $$result.css.add(css$4);
  style = `
		position: ${"absolute"};
		top: 0;
		transform: translate(0, ${offset_top}px);
		z-index: ${1};
	`;
  widthStyle = "";
  return ` <svelte-scroller-outer class="svelte-1yjh2jm"${add_attribute("this", outer, 0)}><svelte-scroller-background-container class="background-container svelte-1yjh2jm" style="${escape(style, true) + escape(widthStyle, true)}"><svelte-scroller-background class="svelte-1yjh2jm"${add_attribute("this", background, 0)}>${slots.background ? slots.background({}) : ``}</svelte-scroller-background></svelte-scroller-background-container> <svelte-scroller-foreground class="svelte-1yjh2jm"${add_attribute("this", foreground, 0)}>${slots.foreground ? slots.foreground({}) : ``}</svelte-scroller-foreground> </svelte-scroller-outer>`;
});
const css$3 = {
  code: ".map.svelte-18lpq0i{width:50%;height:100vh;position:relative;opacity:0;visibility:hidden;-webkit-transition:opacity 2s, visibility 2s;transition:opacity 2s, visibility 2s;outline:rgb(255, 255, 255) solid 3px}.map.visible.svelte-18lpq0i{opacity:1;visibility:visible}",
  map: null
};
const Map$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index } = $$props;
  let { geoJsonToFit } = $$props;
  mapboxgl.accessToken = "pk.eyJ1IjoiZXZvY29kZSIsImEiOiJjbHNrc2JwejYwMzJ4Mm1sZm9rNXFxMzBpIn0.RLaeumLJ5YbXoasg3XQnTw";
  let container;
  let station_markers;
  const color_arrival = d3.scaleLinear().range(["cyan", "purple"]);
  function update_station_markers() {
    station_markers.transition().duration(1e3).attr("r", function(d) {
      if (index == d3.timeFormat("%H")(new Date(d.transit_timestamp))) {
        return calculateRadius(d.ridership);
      } else {
        return 0;
      }
    }).style("fill", function(d) {
      return color_arrival(d.ridership / 3e3);
    });
  }
  function calculateRadius(ridership) {
    const scale = d3.scaleLinear().domain([0, 1, 500]).range(
      [0, 2, 5]
    );
    return scale(ridership);
  }
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.geoJsonToFit === void 0 && $$bindings.geoJsonToFit && geoJsonToFit !== void 0)
    $$bindings.geoJsonToFit(geoJsonToFit);
  $$result.css.add(css$3);
  {
    {
      if (index !== "undefined" && station_markers) {
        update_station_markers();
      }
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-1s9kg0l_START --><link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.14.0/mapbox-gl.css"><!-- HEAD_svelte-1s9kg0l_END -->`, ""} <div class="${["map svelte-18lpq0i", "visible"].join(" ").trim()}"${add_attribute("this", container, 0)}></div>`;
});
const css$2 = {
  code: ".chart.svelte-1yv55b0{position:relative;top:100px;right:100px;width:500px;height:250px;border:1px solid #ccc}.line.svelte-1yv55b0{fill:none;stroke:steelblue;stroke-width:2}",
  map: null
};
const marginTop = 20;
const marginRight = 50;
const marginBottom = 20;
const marginLeft = 80;
const width = 500;
const height = 200;
const Line = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index } = $$props;
  let gx;
  let gy;
  let x, y;
  let lines = [];
  let data = [];
  const customLabelsX = ["1 am", "4 am", "7 am", "10 am", "1 pm", "4 pm", "7 pm", "10 pm"];
  const customLabelsY = ["100", "200", "300", "400"];
  const customColor = (d) => {
    const hour = d3.timeFormat("%H")(d);
    if (hour >= 20) {
      return "orange";
    } else if (hour >= 15) {
      return "red";
    } else if (hour >= 11) {
      return "purple";
    } else if (hour >= 6) {
      return "blue";
    } else {
      return "green";
    }
  };
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$result.css.add(css$2);
  x = scaleUtc().domain(extent(data, (d) => d.date)).range([marginLeft, width - marginRight]);
  y = scaleLinear().domain(extent(data, (d) => d.value)).range([height - marginBottom, marginTop]);
  lines = data.map((d, i, arr) => {
    if (i === 0)
      return null;
    return {
      x1: x(arr[i - 1].date),
      y1: y(arr[i - 1].value),
      x2: x(d.date),
      y2: y(d.value),
      color: customColor(d.date)
    };
  }).filter((d) => d !== null);
  d3.max(data, (d) => Math.abs(d.value));
  {
    d3.select(gx).call(d3.axisBottom(x).ticks(8).tickFormat((d, i) => customLabelsX[i]));
  }
  {
    d3.select(gy).call(d3.axisLeft(y).ticks(4).tickFormat((d, i) => customLabelsY[i]));
  }
  return `<div class="chart svelte-1yv55b0"><svg${add_attribute("width", width, 0)}${add_attribute("height", height + 50, 0)}><g transform="${"translate(0," + escape(height - marginBottom, true) + ")"}"${add_attribute("this", gx, 0)}></g><g transform="${"translate(" + escape(marginLeft, true) + ",0)"}"${add_attribute("this", gy, 0)}></g><g transform="${"translate(" + escape(width / 2, true) + ", " + escape(height - marginBottom / 2 + 30, true) + ")"}"><text font-size="12px" font-family="Nunito, sans-serif" fill="#000" text-anchor="middle">time of day</text></g><g transform="${"translate(" + escape(marginLeft / 2, true) + ", " + escape(height / 2, true) + ") rotate(-90)"}"><text font-size="12px" font-family="Nunito, sans-serif" fill="#000" text-anchor="middle">riders per hour (thousands)</text></g><text font-family="Nunito, sans-serif" font-size="10px"${add_attribute("x", width / 4 - 10, 0)}${add_attribute("y", height / 2 + 70, 0)} text-anchor="middle">early morning
        </text><text font-family="Nunito, sans-serif" font-size="10px"${add_attribute("x", width / 2 - 10, 0)}${add_attribute("y", height / 8 + 15, 0)} text-anchor="middle">a.m. peak
        </text><text font-family="Nunito, sans-serif" font-size="10px"${add_attribute("x", width / 2 + 20, 0)}${add_attribute("y", height / 2 + 40, 0)} text-anchor="middle">midday
        </text><text font-family="Nunito, sans-serif" font-size="10px"${add_attribute("x", width - 110, 0)}${add_attribute("y", height / 8 + 15, 0)} text-anchor="middle">p.m. peak
        </text><text font-family="Nunito, sans-serif" font-size="10px"${add_attribute("x", width - 50, 0)}${add_attribute("y", height / 2 + 40, 0)} text-anchor="middle">evening
        </text><g stroke="#000" stroke-opacity="0.5">${typeof index !== "undefined" && data[index] ? `${each(lines, (line, i) => {
    return `<line${add_attribute("key", i, 0)}${add_attribute("x1", line.x1, 0)}${add_attribute("y1", line.y1, 0)}${add_attribute("x2", line.x2, 0)}${add_attribute("y2", line.y2, 0)} class="line svelte-1yv55b0" style="${"stroke: " + escape(line.color, true) + "; stroke-width: 3;"}"></line>`;
  })} ${each(data, (d, i) => {
    return `<circle${add_attribute("key", i, 0)}${add_attribute("cx", x(d.date), 0)}${add_attribute("cy", y(d.value), 0)} r="2"></circle>`;
  })}  <line${add_attribute("x1", data[index] ? x(data[index].date) : 0, 0)}${add_attribute("y1", marginTop, 0)}${add_attribute("x2", data[index] ? x(data[index].date) : 0, 0)}${add_attribute("y2", height - marginBottom, 0)} stroke="#FF0000" stroke-width="2"></line> <text font-family="Nunito, sans-serif" font-size="12px"${add_attribute("x", data[index] ? x(data[index].date) : 0, 0)}${add_attribute("y", marginTop - 8, 0)}><tspan>${escape(data[index].value)} riders</tspan> <tspan${add_attribute("x", data[index] ? x(data[index].date) : 0, 0)} dy="1.2em" font-size="9px">${escape(d3.timeFormat("%I:%M %p")(data[index].date))}</tspan></text>` : ``}</g></svg></div>`;
});
const css$1 = {
  code: 'svg.svelte-bssioj{background-color:#f0f0f0;position:"absolute";font-size:16px}',
  map: null
};
const Graph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index } = $$props;
  let { offset } = $$props;
  let data = Array.from({ length: 800 }, (_, i) => i);
  const lines = [
    "The bustling metropolis of New York, often dubbed the 'City that ",
    "never sleeps,' is home to around 8 million residents as of 2024. This",
    "vast community relies extensively on the efficiency and ",
    "accessibility of public transportation networks, such as the ",
    "iconic subway system, to sustain its vibrancy and fuel its economic ",
    "growth and prosperity."
  ];
  let text;
  function createCircles() {
    const svg = select("svg");
    svg.selectAll("circle").remove();
    svg.selectAll("circle").data(data).enter().append("circle").attr("cx", (_, i) => i % 39 * 20 + 10).attr(
      "cy",
      (_, i) => Math.floor(i / 39) * 20 + 10
      // Adjust y position based on the number of columns
    ).attr("r", 0).attr(
      "fill",
      (_, i) => offset > 0.3 ? i < data.length / 2 ? "red" : "blue" : "blue"
    ).attr("opacity", 0).transition().duration(
      500
      // Apply transition for fading in effect // Duration of the transition
    ).delay((_, i) => i * 5).attr(
      "r",
      5
      // Animate radius
    ).attr("opacity", 0.7);
    svg.append("circle").attr("id", "legend").attr(
      "cx",
      850
    ).attr("cy", 20).attr("fill", "blue").attr("opacity", 0).transition().duration(
      500
      // Apply transition for fading in effect // Duration of the transition
    ).delay((_, i) => i * 5).attr(
      "r",
      5
      // Animate radius
    ).attr("opacity", 0.7);
    text = svg.append("text").attr("x", 850).attr(
      "y",
      50
      // Adjust y position as needed
    ).attr("fill", "black").style("opacity", 0);
    text.selectAll("tspan").data(lines.filter((_, i) => i <= 6)).enter().append("tspan").attr("x", 850).attr("dy", (d, i) => i === 0 ? 0 : "1.2em").text(
      (d) => d
    );
    text.append("tspan").attr("x", 860).attr("y", 25).text(" = 10,000 residents");
    text.transition().duration(1e3).style(
      "opacity",
      1
    );
  }
  function updateColor(color) {
    select("svg").selectAll("circle").filter((_, i) => i < 250).transition().duration(
      500
      // Duration of the transition
    ).attr("fill", color);
    text.append("tspan").attr("x", 850).attr("y", 200).text(
      "Of all people who commuted to work in New York City in 2021,"
    );
    text.append("tspan").attr("x", 850).attr("y", 220).text(
      " 32% use the subway. This totals up to close to 2.5 million"
    );
    text.append("tspan").attr("x", 850).attr("y", 240).text(
      "commuters that use the NYC subway network."
    );
    text.selectAll("tspan").filter((_, i) => i >= 7).style("opacity", 0).transition().duration(
      1e3
      // Apply transition for fading in effect // Duration of the transition
    ).style("opacity", 1);
  }
  function addTrains() {
    select("svg").selectAll("circle").filter((_, i) => i >= 250 && i != 800).transition().duration(
      500
      // Apply transition for fading away // Duration of the transition
    ).attr("opacity", 0).remove();
    const svg = select("svg");
    svg.selectAll("rect").remove();
    svg.selectAll("rect").data(Array.from({ length: 64 }, (_, i) => i)).enter().append("rect").attr("id", "to-move").attr("x", -100).attr(
      "y",
      (_, i) => Math.floor(i / 13) * 40 + 150
      // Adjust y position based on the number of rows
    ).attr("width", 40).attr(
      "height",
      20
      // Set height of rectangles
    ).attr("fill", "none").attr(
      "stroke",
      "black"
      // Set outline color to black
    ).transition().duration(
      1e3
      // Duration of the transition
    ).attr("x", (_, i) => i % 13 * 60).on("end", function() {
      svg.selectAll("circle:not(#legend)").transition().duration(
        1e3
        // Duration of the transition
      ).attr("id", function(_, i) {
        let conditionalOffset = 0;
        if (i % 3 !== 2 && Math.floor(i / 39) % 2 === 0 && i <= 190) {
          conditionalOffset = 230;
        } else if (i % 3 !== 2 && Math.floor(i / 39) % 2 === 1 && i <= 160) {
          conditionalOffset = 130;
        }
        return conditionalOffset !== 0 ? "to-move" : null;
      }).attr("cy", (_, i) => {
        let basePosition = Math.floor(i / 39) * 20 + 10;
        let conditionalOffset = 0;
        if (i % 3 !== 2 && Math.floor(i / 39) % 2 === 0 && i <= 190) {
          conditionalOffset = 230;
        } else if (i % 3 !== 2 && Math.floor(i / 39) % 2 === 1 && i <= 160) {
          conditionalOffset = 130;
        }
        return basePosition + conditionalOffset;
      });
    });
    svg.append("rect").attr("id", "legend").attr(
      "cx",
      850
    ).attr("cy", 180).attr("fill", "blue").attr("opacity", 0).transition().duration(
      500
      // Apply transition for fading in effect // Duration of the transition
    ).delay((_, i) => i * 5).attr(
      "r",
      5
      // Animate radius
    ).attr("opacity", 0.7);
    text.append("tspan").attr("x", 850).attr("y", 280).text(
      "On the other hand, thre are only around 6400 subways cars,"
    );
    text.append("tspan").attr("x", 850).attr("y", 300).text(
      "acccording to the MTA. These cars fit an average of 200"
    );
    text.append("tspan").attr("x", 850).attr("y", 320).text(
      "people, meaning even if all subway cars were in use and "
    );
    text.append("tspan").attr("x", 850).attr("y", 340).text(
      "in full capacity, it could only carry around 1/2 of the"
    );
    text.append("tspan").attr("x", 850).attr("y", 360).text(
      "NYC commuters."
    );
    text.selectAll("tspan").filter((_, i) => i >= 10).style("opacity", 0).transition().duration(
      1e3
      // Apply transition for fading in effect // Duration of the transition
    ).style("opacity", 1);
  }
  function moveLeftAndOut() {
    const svg = select("svg");
    svg.selectAll("#to-move").transition().duration(
      1e3
      // Duration of the transition
    ).attr("cx", -200).attr("x", -200);
  }
  function addGreenCircles() {
    const svg = select("svg");
    svg.selectAll(".green-circle").data(Array.from({ length: 100 })).enter().append(
      "circle"
    ).attr("class", "green-circle").attr("cx", (_, i) => Math.random() * 800).attr(
      "cy",
      600
      // Starting position below the SVG
    ).attr("r", 0).attr(
      "fill",
      "green"
      // Fill color set to green
    ).transition().duration(
      1e3
      // Duration of the transition
    ).delay((_, i) => i * 10).attr(
      "r",
      5
      // Animate radius
    ).attr("cy", (_, i) => 500 - Math.random() * 100);
    text.append("tspan").attr("x", 850).attr("y", 400).text(
      "In addition, the annual 56.7 million visitors recorded in"
    );
    text.append("tspan").attr("x", 850).attr("y", 420).text(
      "2022 will only make the MTA subways even more populated,"
    );
    text.append("tspan").attr("x", 850).attr("y", 440).text(
      "making navigation in these subways more difficult, stressful,"
    );
    text.append("tspan").attr("x", 850).attr("y", 460).text(
      "and challenging."
    );
    text.selectAll("tspan").filter((_, i) => i >= 15).style("opacity", 0).transition().duration(
      1e3
      // Apply transition for fading in effect // Duration of the transition
    ).style("opacity", 1);
  }
  let circleMade = false;
  let circleUpdate = false;
  let addTrain = false;
  let updateTriggered = false;
  let addGreenTriggered = false;
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  $$result.css.add(css$1);
  {
    if (index === 1 && offset > 0.15 && !circleMade) {
      createCircles();
      circleMade = true;
    }
  }
  {
    if (index === 1 && offset > 0.3 && !circleUpdate) {
      updateColor("red");
      circleUpdate = true;
    }
  }
  {
    if (index === 1 && offset > 0.45 && !addTrain) {
      addTrains();
      addTrain = true;
    }
  }
  {
    {
      if (index === 1 && offset > 0.6 && !updateTriggered) {
        moveLeftAndOut();
        updateTriggered = true;
      }
    }
  }
  {
    {
      if (index === 1 && offset > 0.75 && !addGreenTriggered) {
        addGreenCircles();
        addGreenTriggered = true;
      }
    }
  }
  return `<svg width="100%" height="600" class="svelte-bssioj"></svg>`;
});
const css = {
  code: '.header.svelte-1xjujmc{font-family:Nunito, sans-serif;background-color:#d9d9d9;padding:20px;border-bottom:2px solid #ccc}.header-content.svelte-1xjujmc{background-color:"#d9d9d9";display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:justify;justify-content:space-between}.section-text.svelte-1xjujmc{-webkit-box-flex:1;flex:1;margin-right:20px}h1.svelte-1xjujmc{font-size:50px}h2.svelte-1xjujmc{font-size:20px;font-family:Nunito, sans-serif}.foreground.svelte-1xjujmc{width:100%;position:relative;background-color:#f0f0f0;z-index:0}.background.svelte-1xjujmc{width:100%;height:100vh;position:relative;outline:rgb(255, 255, 255) solid 3px;z-index:1}section.svelte-1xjujmc{height:100vh;width:91.5%;position:relative;background-color:#f0f0f0;padding-left:60px;padding-right:60px}.progress-bars.svelte-1xjujmc{position:fixed;top:0px;right:20px;z-index:999}.fixed-graph.svelte-1xjujmc{position:sticky;top:50px;z-index:999}',
  map: null
};
const ScrollyTeller = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let count, index, offset, progress;
  let width2, height2;
  let geoJsonToFit = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [1, 0] }
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [0, 1] }
      }
    ]
  };
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    geoMercator().fitSize([width2, height2], geoJsonToFit);
    $$rendered = `${validate_component(Scroller, "Scroller").$$render(
      $$result,
      {
        top: 0,
        bottom: 1,
        threshold: 0.5,
        count,
        index,
        offset,
        progress
      },
      {
        count: ($$value) => {
          count = $$value;
          $$settled = false;
        },
        index: ($$value) => {
          index = $$value;
          $$settled = false;
        },
        offset: ($$value) => {
          offset = $$value;
          $$settled = false;
        },
        progress: ($$value) => {
          progress = $$value;
          $$settled = false;
        }
      },
      {
        foreground: () => {
          return `<div class="foreground svelte-1xjujmc" slot="foreground"><div class="progress-bars svelte-1xjujmc"><p>current section: <strong>${escape(index + 1)}/${escape(count)}</strong></p> <progress${add_attribute("value", count ? (index + 1) / count : 0, 0)}></progress> <p>offset in current section: <strong>${escape(parseFloat(offset).toFixed(2))}/1</strong></p> <progress${add_attribute("value", offset || 0, 0)}></progress></div> <section style="height: 400px; background-color: #d9d9d9;" class="svelte-1xjujmc" data-svelte-h="svelte-1nnkr4a"><div class="header svelte-1xjujmc" background-color="#d9d9d9"><div class="header-content svelte-1xjujmc"><div class="section-text svelte-1xjujmc"><h1 class="svelte-1xjujmc">A Deep Dive into MTA Data</h1> <h2 class="svelte-1xjujmc">An interactive tool for New York City&#39;s subway system navigation</h2></div></div></div></section> <section style="height: 3200px;" class="svelte-1xjujmc"><div class="fixed-graph svelte-1xjujmc"><h2 class="svelte-1xjujmc" data-svelte-h="svelte-73zzey">The Issue</h2> ${validate_component(Graph, "Graph").$$render($$result, { index, offset }, {}, {})}</div></section> <section class="svelte-1xjujmc" data-svelte-h="svelte-xowihu">index</section> <section class="svelte-1xjujmc" data-svelte-h="svelte-xzfoxw">section 3.</section> <section class="svelte-1xjujmc">section 4
        ${validate_component(Map$1, "Map").$$render(
            $$result,
            { index, geoJsonToFit },
            {
              geoJsonToFit: ($$value) => {
                geoJsonToFit = $$value;
                $$settled = false;
              }
            },
            {}
          )}</section> <section class="svelte-1xjujmc">section 5
        ${validate_component(Line, "Line").$$render($$result, { index }, {}, {})}</section></div>`;
        },
        background: () => {
          return `<div class="background svelte-1xjujmc" slot="background" data-svelte-h="svelte-afik7u"></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(ScrollyTeller, "ScrollyTeller").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
