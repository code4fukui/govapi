class SPARQL {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  async query(query) {
    const url = this.endpoint + "?output=json&query=" + encodeURIComponent(query);
    const res = await (await fetch(url)).json();
    return res.results.bindings;
  }
  async getGraphs(type) {
    const res = await sparql.query("select distinct ?g { graph ?g { ?s a <" + type + "> }}");
    return res.map(p => p.g.value);
  }
  async getDataset(graph) {
    const res = await sparql.query("select * { <" + graph + "> ?p ?o }");
    return res.map(p => [p.p.value, p.o.value]);
  }
}

const sparql = new SPARQL("https://sparql.odp.jig.jp/api/v1/sparql");
const res = await sparql.getGraphs("http://odp.jig.jp/odp/1.0#AdministrativeService");
console.log(res);
const n = prompt("which graph?");
const graph = res[n];
const dataset = await sparql.getDataset(graph);
console.log(dataset)
