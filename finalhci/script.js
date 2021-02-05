var width = 550,height = 500;
var linkDistance =70;
var colors = d3.scale.category10();
var sle1=[],sle2=[];
var count1=0,count2=0,i=0,j=0,counter=0,selection=0,max=0;
var svg = d3.select("#t1").append("svg")
    .attr("width", width)
    .attr("height", height);
var svg1 = d3.select("#t2").append("svg")
    .attr("width", width)
    .attr("height", height);
var force = d3.layout.force()
    .size([width,height])
        .linkDistance([linkDistance])
        .charge([-100])
        .theta(0.1)
        .gravity(0.05)
        .start();
var force1 = d3.layout.force()
    .size([width,height])
        .linkDistance([linkDistance])
        .charge([-100])
        .theta(0.1)
        .gravity(0.05)
        .start()
d3.json("bef1.json", function(data) {
  force
      .nodes(data.nodes)
      .links(data.links)
      .start();
  var link = svg.selectAll(".link")
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr('marker-end','url(#arrowhead)')
      .style("stroke","blue")
      .style("pointer-events", "none");
  var node = svg.selectAll(".node")
      .data(data.nodes)
      .enter().append("g")
      .attr("class", "node")
      .on("click", click1)
      .call(force.drag);
  node.append("rect")
      .attr("width", 40)
      .attr("height", 20)
      .style("fill",function(d,i){return colors(i);})
  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.movie_title });
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
   			node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});
function click1(element ) {
        d3.select(this).select("rect").transition()
        .duration(750)
        .attr("width", 44)
        .attr("height", 24)
        .style("fill", "black");
      sle1[count1++]=element;
	  sel_count+=1;
 }
function nodesummary() {}
 d3.json("af1.json", function(data) {
  force1
      .nodes(data.nodes)
      .links(data.links)
      .start();
  var link = svg1.selectAll(".link")
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr('marker-end','url(#arrowhead)')
      .style("stroke","blue")
      .style("pointer-events", "none");
  var node1 = svg1.selectAll(".node")
      .data(data.nodes)
      .enter().append("g")
      .attr("class", "node")
      .on("click", click2)
      .call(force1.drag);
  node1.append("rect")
      .attr("width", 40)
      .attr("height", 20)
      .style("fill",function(d,i){return colors(i);})
  node1.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.movie_title });
  force1.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
   			node1.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});
function click2(element ) {
 d3.select(this).select("rect").transition()
        .duration(750)
        .attr("width", 44)
        .attr("height", 24)
        .style("fill", "black");
	 sle2[count2++]=element;
	 sel_count1+=1;
 }
 function node_summary() {
 var att=["movie_title","director_name","num_critic_for_reviews","duration","director_facebook_likes","actor_3_facebook_likes","actor_2_name","actor_1_facebook_likes","gross","genres","actor_1_name","num_voted_users","cast_total_facebook_likes","actor_3_name","plot_keywords","facenumber_in_poster","num_user_for_reviews","language","country","content_rating","budget","title_year","imdb_score","imdb_score"];
		var table = document.getElementById("net1");
		var row   = table.insertRow(0);
		row.insertCell(0).outerHTML = "<th>Network 1</th>"; 
		row.insertCell(1).outerHTML = "<th>Network 2</th>"; 
		row.insertCell(2).outerHTML = "<th>Similarities</th>"; 
		for(i=0;i<count1;i++)
		{
			for(j=0;j<count2;j++)
			{
				var s="";
				for(k=0;k<att.length;k++)
				{
					if(sle1[i][att[k]]===sle2[j][att[k]])
						{
						s+=att[k]+":"+sle1[i][att[k]]+","
						counter+=1;
						max = (counter)/(2*att.length-counter);
						}
				}
				if(s!="")
				{    s=s.slice(0,-1);
					var tr = table.insertRow(table.rows.length);  
		      var cell1=tr.insertCell(0);
					var cell2=tr.insertCell(1);
					var cell3=tr.insertCell(2);
					cell1.innerHTML=sle1[i][att[0]];
					cell2.innerHTML=sle2[j][att[0]];
					cell3.innerHTML=s;
					s="";
				}
			}
		}
		alert(max);
 }
