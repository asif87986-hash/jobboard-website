// JobBoard V2. Admin data is browser-local only; this is not a secure or shared backend.
const KEY="jobboard-v2-listings";
const samples=[
{id:"s1",title:"Junior Sales Executive",company:"Northstar Demo Co.",city:"Jaipur",cat:"Sales",type:"Full-time",salary:"₹15,000–₹20,000",desc:"Support customer enquiries, maintain follow-ups and help the sales team reach its goals."},
{id:"s2",title:"Graphic Design Intern",company:"Pixel Grove Demo",city:"Remote",cat:"Design",type:"Internship",salary:"₹8,000–₹12,000",desc:"Create social media graphics and simple marketing layouts while learning a design workflow."},
{id:"s3",title:"Customer Support Associate",company:"Bright Desk Demo",city:"Jaipur",cat:"Support",type:"Full-time",salary:"₹14,000–₹18,000",desc:"Help customers with product questions through email and chat. Clear written communication is useful."},
{id:"s4",title:"Frontend Developer Trainee",company:"Code Meadow Demo",city:"Remote",cat:"Technology",type:"Trainee",salary:"₹10,000–₹16,000",desc:"Learn to build accessible web pages using HTML, CSS and JavaScript with guidance from a team."},
{id:"s5",title:"Marketing Coordinator",company:"Amber Leaf Demo",city:"Delhi",cat:"Marketing",type:"Full-time",salary:"₹18,000–₹24,000",desc:"Assist with campaign schedules, content coordination and basic performance reporting."},
{id:"s6",title:"Office Administrator",company:"Cedar Works Demo",city:"Jaipur",cat:"Administration",type:"Full-time",salary:"₹13,000–₹17,000",desc:"Organise records, coordinate routine office tasks and support day-to-day operations."}];
const $=s=>document.querySelector(s);let jobs;
try{jobs=JSON.parse(localStorage.getItem(KEY))||structuredClone(samples);if(!Array.isArray(jobs))jobs=structuredClone(samples)}catch{jobs=structuredClone(samples)}
const save=()=>localStorage.setItem(KEY,JSON.stringify(jobs));
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),3000)}
function fillSelect(el,vals,label){const old=el.value;el.replaceChildren(new Option(label,""));vals.sort().forEach(v=>el.add(new Option(v,v)));if(vals.includes(old))el.value=old}
function filters(){fillSelect($("#location"),[...new Set(jobs.map(j=>j.city))],"All locations");fillSelect($("#category"),[...new Set(jobs.map(j=>j.cat))],"All categories")}
function node(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;e.textContent=txt;return e}
function render(){
 const q=$("#search").value.toLowerCase().trim(),loc=$("#location").value,cat=$("#category").value;
 const list=jobs.filter(j=>(`${j.title} ${j.company} ${j.city} ${j.cat} ${j.desc}`).toLowerCase().includes(q)&&(!loc||j.city===loc)&&(!cat||j.cat===cat));
 $("#count").textContent=`${list.length} of ${jobs.length} jobs`;$("#jobList").replaceChildren();
 if(!list.length){$("#jobList").append(node("p","empty","No matching jobs. Try another search or filter."));return}
 list.forEach(j=>{const c=node("article","card",""),top=node("div","cardtop",""),info=node("div","","");info.append(node("p","muted",j.company),node("h3","",j.title));top.append(info,node("span","tag",j.cat));const meta=node("div","meta","");[j.city,j.type,j.salary||"Salary not specified"].forEach(v=>meta.append(node("span","",v)));const d=node("p","",j.desc.length>140?j.desc.slice(0,140)+"…":j.desc);const b=node("button","primary","View details");b.onclick=()=>details(j.id);c.append(top,meta,d,b);$("#jobList").append(c)})
}
function details(id){const j=jobs.find(x=>x.id===id);if(!j)return;$("#detailCat").textContent=j.cat;$("#detailCompany").textContent=j.company;$("#detailTitle").textContent=j.title;$("#detailMeta").textContent=[j.city,j.type,j.salary||"Salary not specified"].join(" · ");$("#detailDesc").textContent=j.desc;$("#apply").onclick=()=>toast("Demo only: no application is submitted.");$("#details").showModal()}
function reset(){ $("#jobForm").reset();$("#editId").value="";$("#formTitle").textContent="Add a job";$("#save").textContent="Save job"}
function adminRender(){const box=$("#adminList");box.replaceChildren();$("#adminCount").textContent=`${jobs.length} listings`;jobs.forEach(j=>{const r=node("div","adminrow",""),info=node("div","","");info.append(node("b","",j.title),node("small","",`${j.company} · ${j.city} · ${j.cat}`));const actions=node("div","actions","");const e=node("button","soft","Edit");e.onclick=()=>edit(j.id);const d=node("button","danger","Delete");d.onclick=()=>remove(j.id);actions.append(e,d);r.append(info,actions);box.append(r)})}
function edit(id){const j=jobs.find(x=>x.id===id);if(!j)return;$("#editId").value=j.id;$("#title").value=j.title;$("#company").value=j.company;$("#city").value=j.city;$("#cat").value=j.cat;$("#type").value=j.type;$("#salary").value=j.salary;$("#desc").value=j.desc;$("#formTitle").textContent="Edit a job";$("#save").textContent="Update job";$("#title").focus()}
function remove(id){const j=jobs.find(x=>x.id===id);if(!j||!confirm(`Delete ${j.title} from this browser?`))return;jobs=jobs.filter(x=>x.id!==id);save();filters();render();adminRender();reset();toast("Deleted in this browser.")}
["search","location","category"].forEach(id=>{$("#"+id).addEventListener("input",render);$("#"+id).addEventListener("change",render)});
$("#clear").onclick=()=>{$("#search").value="";$("#location").value="";$("#category").value="";render()};
$("#adminToggle").onclick=()=>{const p=$("#admin");p.hidden=!p.hidden;if(!p.hidden){adminRender();p.scrollIntoView({behavior:"smooth"})}};
$("#closeAdmin").onclick=()=>$("#admin").hidden=true;$("#resetForm").onclick=reset;
$("#jobForm").onsubmit=e=>{e.preventDefault();const id=$("#editId").value;const j={id:id||"u"+Date.now(),title:$("#title").value.trim(),company:$("#company").value.trim(),city:$("#city").value.trim(),cat:$("#cat").value.trim(),type:$("#type").value,salary:$("#salary").value.trim(),desc:$("#desc").value.trim()};if(!j.title||!j.company||!j.city||!j.cat||!j.desc){toast("Complete all required fields.");return}jobs=id?jobs.map(x=>x.id===id?j:x):[j,...jobs];save();filters();render();adminRender();reset();toast(id?"Updated in this browser.":"Added in this browser.")};
$("#restore").onclick=()=>{if(!confirm("Replace local changes with the six sample jobs?"))return;jobs=structuredClone(samples);save();filters();render();adminRender();reset();toast("Sample data restored.")};
$("#x").onclick=()=>$("#details").close();$("#closeDetails").onclick=()=>$("#details").close();
filters();render();