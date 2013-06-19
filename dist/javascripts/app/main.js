(function(){define("app/Utils",[],function(){return{num2hex:function(e,t){var n,r;n=e!=null?e:0,n|=0,n<0&&(n+=4294967296),r=n.toString(16);while(r.length<t)r="0"+r;return"0x"+r},hex2num:function(e){return-(~parseInt(e,16)+1)},lengthFromName:function(e){return e.indexOf("val")!==-1||e.indexOf("predPC")!==-1?8:1},hexPack:function(e,t){return e*16+t},low4:function(e){return e&15},high4:function(e){return e>>4&15},gen:function(e){return{reg:e.reg.slice(0),memory:e.memory.slice(0),variables:{},cc:e.cc.slice(0),status:e.status}},getWord:function(e,t){var n,r,i,s;return n=e[t],r=e[t+1],i=e[t+2],s=e[t+3],n|r<<8|i<<16|s<<24},setWord:function(e,t,n){return e[t]=n&255,e[t+1]=n>>8&255,e[t+2]=n>>16&255,e[t+3]=n>>24&255}}})}).call(this),function(){var e={}.hasOwnProperty;define("app/Painter",["jquery","kinetic","./Utils"],function(t,n,r){return function(){function S(e){this.container=e}var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E;return S.prototype.cycle={variables:{},reg:[0,0,0,0,0,0,0,0],cc:[!1,!1,!1]},v=null,d=null,h=null,p={},a={white:"white",black:"black",blue:"#8ED8F8",red:"red"},n.Rect.prototype.rightX=function(){return this.getX()+this.getWidth()},s=new n.Rect({width:30,height:25,stroke:a.black,strokeWidth:1.5}),n.Group.prototype.rightX=function(){var e,t,n,r,i;t=this.getChildren(),n=0;for(r=0,i=t.length;r<i;r++)e=t[r],e.getClassName()==="Rect"&&(n=e.rightX());return n},n.Group.prototype.addNameRect=function(e){var t,r;return r=s.clone({width:e,fill:a.blue}),t=new n.Text({width:20,fill:a.white,text:this.stageName,fontFamily:"Calibri",fontSize:12,align:"center"}),t.setY((r.getHeight()-t.getHeight())/2),this.add(r),this.add(t)},n.Group.prototype.addRect=function(e,t,r){var i,o,u;u=this.rightX(),o=s.clone({width:e,fill:t,x:u,height:25,stroke:a.black,strokeWidth:1.5}),this.add(o);if(r)return i=new n.Text({fill:a.black,fontFamily:"Consolas",fontSize:11,align:"center",width:e,x:u}),i.labelName=r,i.fullName=this.stageName+"_"+r,p[i.fullName]=i,this.add(i)},c=function(e){var t;return t=new n.Group({x:20,y:e}),t.stageName="F",t.addNameRect(80),t.addRect(70,a.white,"predPC"),t.addRect(310,a.blue),t},f=function(e){var t;return t=new n.Group({x:20,y:e}),t.stageName="D",t.addNameRect(30),t.addRect(30,a.white,"stat"),t.addRect(35,a.white,"icode"),t.addRect(35,a.white,"ifun"),t.addRect(30,a.white,"rA"),t.addRect(30,a.white,"rB"),t.addRect(70,a.white,"valC"),t.addRect(15,a.blue),t.addRect(70,a.white,"valP"),t.addRect(115,a.blue),t},l=function(e){var t;return t=new n.Group({x:20,y:e}),t.stageName="E",t.addNameRect(30),t.addRect(30,a.white,"stat"),t.addRect(35,a.white,"icode"),t.addRect(35,a.white,"ifun"),t.addRect(70,a.white,"valC"),t.addRect(70,a.white,"valA"),t.addRect(70,a.white,"valB"),t.addRect(30,a.white,"dstE"),t.addRect(30,a.white,"dstM"),t.addRect(30,a.white,"srcA"),t.addRect(30,a.white,"srcB"),t},m=function(e){var t;return t=new n.Group({x:20,y:e}),t.stageName="M",t.addNameRect(30),t.addRect(30,a.white,"stat"),t.addRect(35,a.white,"icode"),t.addRect(30,a.blue),t.addRect(35,a.white,"Cnd"),t.addRect(20,a.blue),t.addRect(70,a.white,"valE"),t.addRect(70,a.white,"valA"),t.addRect(20,a.blue),t.addRect(30,a.white,"dstE"),t.addRect(30,a.white,"dstM"),t.addRect(60,a.blue),t},E=function(e){var t;return t=new n.Group({x:20,y:e}),t.stageName="W",t.addNameRect(30),t.addRect(30,a.white,"stat"),t.addRect(35,a.white,"icode"),t.addRect(85,a.blue),t.addRect(70,a.white,"valE"),t.addRect(70,a.white,"valM"),t.addRect(20,a.blue),t.addRect(30,a.white,"dstE"),t.addRect(30,a.white,"dstM"),t.addRect(60,a.blue),t},b=[],y=["%eax","%ecx","%edx","%ebx","%esp","%ebp","%esi","%edi"],w=[],o=["ZF","SF","OF"],u=[],g=function(e){var t,r,i,o,f,l,c;t=new n.Group({x:20,y:e}),f=70,b=[],w=[];for(r=l=0;l<=7;r=++l)i=s.clone({x:r%4*f,y:Math.floor(r/4)*25,fill:a.white,width:f}),o=new n.Text({fill:a.black,fontFamily:"Consolas",fontSize:11,align:"center",x:i.getX(),width:f}),b.push(i),w.push(o),t.add(i),t.add(o);f=50,u=[];for(r=c=0;c<=2;r=++c)i=s.clone({x:r*f+310,y:10,fill:a.white,width:f}),o=new n.Text({fill:a.black,fontFamily:"Consolas",align:"center",fontSize:11,x:i.getX(),y:i.getY(),width:f}),u.push(o),t.add(i),t.add(o);return t},S.prototype.render=function(){var e;return e=t(window).width()/800,v=new n.Stage({container:this.container,width:t(window).width()*.65,height:1e3,scale:e}),h=new n.Layer,h.add(new n.Text({id:"info",fontSize:15,fill:a.blue,padding:10,fontFamily:"Consolas",shadowColor:a.black,shadowBlur:-1,shadowOffset:1})),v.add(h),this.renderMain()},S.prototype.renderMain=function(){return d!=null&&d.remove(),h.hide(),p={},d=new n.Layer,d.add(c(270)),d.add(f(210)),d.add(l(150)),d.add(m(90)),d.add(E(30)),d.add(g(330)),v.add(d),this.show()},i="images/",S.prototype.genTooltip=function(e,t,i,s,o,u){var a,f;return a=new n.Rect({id:o,x:e,y:t,height:i,width:s,len:u}),f=this,a.on("mouseover",function(){var e;return u=this.getAttr("len"),e=f.cycle.variables[this.getId()],u===-1?e=f.strToStat(e):u!==0&&(e=r.num2hex(e,u)),e=this.getId()+" = "+e,h.get("#info")[0].setText(e),h.draw()}),a.on("mouseout",function(){return h.get("#info")[0].setText(""),h.draw()}),d.add(a)},S.prototype.genRect=function(e,t,r,i,s){var o;return o=new n.Text({id:i+s,name:s,x:e,y:t,oldY:t,width:r,fontSize:28,fill:a.black,fontFamily:"Consolas",align:"center",text:s}),o.setY(o.getAttr("oldY")+(58-o.getHeight())/2),d.add(o)},S.prototype.genLine=function(e,t,r,i){var s;return s=new n.Line({name:r,from:i,points:e,stroke:a.red,strokeWidth:t}),d.add(s)},S.prototype.f_addTooltip=function(){return this.genTooltip(75,210,45,85,"f_stat",-1),this.genTooltip(5,350,75,110,"instr_valid",0),this.genTooltip(635,285,75,110,"need_valC",0),this.genTooltip(635,390,75,110,"need_regids",0),this.genTooltip(185,525,45,85,"f_icode",1),this.genTooltip(275,525,45,85,"f_ifun",1),this.genTooltip(300,890,165,135,"f_pc",8),this.genTooltip(1015,185,115,135,"f_predPC",8),this.genTooltip(1169,0,22,92,"M_icode",1),this.genTooltip(1201,47,22,75,"M_Cnd",0),this.genTooltip(1237,92,22,81,"M_valA",8),this.genTooltip(1271,139,22,95,"W_icode",1),this.genTooltip(1304,184,22,88,"W_valM",8),this.genTooltip(62,773,22,127,"imem_error",0)},S.prototype.f_addRects=function(){return this.genRect(96,101,85,"D_","stat"),this.genRect(183,101,85,"D_","icode"),this.genRect(272,101,85,"D_","ifun"),this.genRect(361,101,85,"D_","rA"),this.genRect(450,101,85,"D_","rB"),this.genRect(539,101,175,"D_","valC"),this.genRect(806,101,175,"D_","valP"),this.genRect(278,1111,175,"F_","predPC")},S.prototype.f_addLines=function(){return this.genLine([1245,125,1245,977,455,977],6,"M_valA","f_pc_from"),this.genLine([1312,215,1312,1029,455,1029],6,"W_valM","f_pc_from"),this.genLine([366,1107,366,1075],6,"F_predPC","f_pc_from"),this.genLine([588,595,588,239,990,239],6,"f_valC","f_predPC_from"),this.genLine([893,308,893,282,990,282],6,"f_valP","f_predPC_from")},S.prototype.f_render=function(){var e,t;return d!=null&&d.remove(),h.show(),e=new Image,t=this,e.onload=function(){var r,i;return i=800/e.width*.62,d=new n.Layer({y:10,scale:i}),r=new n.Image({width:e.width,height:e.height,image:e}),d.add(r),t.f_addLines(),t.f_addRects(),t.f_addTooltip(),v.add(d),t.show()},e.src=i+"F-D.png"},S.prototype.d_addLines=function(){return this.genLine([1463,73,1463,469,777,469,777,433],6,"e_valE","d_valA_from"),this.genLine([1463,73,1463,469,984,469,984,433],6,"e_valE","d_valB_from"),this.genLine([1511,150,1511,517,747,517,747,433],6,"M_valE","d_valA_from"),this.genLine([1511,150,1511,517,954,517,954,433],6,"M_valE","d_valB_from"),this.genLine([1561,227,1561,566,717,566,717,433],6,"m_valM","d_valA_from"),this.genLine([1561,227,1561,566,924,566,924,433],6,"m_valM","d_valB_from"),this.genLine([1608,314,1608,615,687,615,687,433],6,"W_valM","d_valA_from"),this.genLine([1608,314,1608,615,894,615,894,433],6,"W_valM","d_valB_from"),this.genLine([1655,398,1655,663,657,663,657,433],6,"W_valE","d_valA_from"),this.genLine([1655,398,1655,663,864,663,864,433],6,"W_valE","d_valB_from"),this.genLine([736,770,736,749,627,749,627,433],6,"d_rvalA","d_valA_from"),this.genLine([900,770,900,750,834,750,834,433],6,"d_rvalB","d_valB_from"),this.genLine([785,1293,785,1145,605,1145,605,433],6,"D_valP","d_valA_from"),this.genLine([474,1293,474,1274,1049,1274,1049,1188],3,"D_rB","d_dstE_from"),this.genLine([474,1293,474,1274,1316,1274,1316,1188],3,"D_rB","d_srcB_from"),this.genLine([394,1293,394,1241,1138,1241,1138,1188],3,"D_rA","d_dstM_from"),this.genLine([394,1293,394,1241,1228,1241,1228,1188],3,"D_rA","d_srcA_from")},S.prototype.d_addRects=function(){return this.genRect(93,224,85,"E_","stat"),this.genRect(179,224,85,"E_","icode"),this.genRect(264,224,85,"E_","ifun"),this.genRect(440,224,175,"E_","valC"),this.genRect(614,224,175,"E_","valA"),this.genRect(832,224,175,"E_","valB"),this.genRect(1008,224,85,"E_","dstE"),this.genRect(1095,224,85,"E_","dstM"),this.genRect(1183,224,85,"E_","srcA"),this.genRect(1271,224,85,"E_","srcB"),this.genRect(92,1297,85,"D_","stat"),this.genRect(177,1297,85,"D_","icode"),this.genRect(265,1297,85,"D_","ifun"),this.genRect(352,1297,85,"D_","rA"),this.genRect(439,1297,85,"D_","rB"),this.genRect(525,1297,175,"D_","valC"),this.genRect(700,1297,175,"D_","valP")},S.prototype.d_addTooltips=function(){return this.genTooltip(595,320,90,200,"d_valA",8),this.genTooltip(825,320,90,185,"d_valB",8),this.genTooltip(1005,1130,40,85,"d_dstE",1),this.genTooltip(1095,1130,40,85,"d_dstM",1),this.genTooltip(1185,1130,40,85,"d_srcA",1),this.genTooltip(1275,1130,40,85,"d_srcB",1),this.genTooltip(1446,0,21,75,"e_dstE",1),this.genTooltip(1466,43,21,73,"e_valE",8),this.genTooltip(1486,88,21,81,"M_dstE",1),this.genTooltip(1514,124,21,80,"M_valE",8),this.genTooltip(1538,165,21,84,"M_dstM",1),this.genTooltip(1562,202,21,83,"m_valM",8),this.genTooltip(1583,242,21,88,"W_dstM",1),this.genTooltip(1607,287,21,86,"W_valM",8),this.genTooltip(1630,329,21,84,"W_dstE",1),this.genTooltip(1656,369,21,84,"W_valE",8),this.genTooltip(697,721,21,82,"d_rvalA",8),this.genTooltip(856,721,21,82,"d_rvalB",8)},S.prototype.d_render=function(){var e,t;return d!=null&&d.remove(),h.show(),e=new Image,t=this,e.onload=function(){var r,i;return i=800/e.width*.62,d=new n.Layer({y:10,scale:i}),r=new n.Image({width:e.width,height:e.height,image:e}),d.add(r),t.d_addLines(),t.d_addRects(),t.d_addTooltips(),v.add(d),t.show()},e.src=i+"D-E.png"},S.prototype.e_addLines=function(){return this.genLine([549,696,549,480],6,"E_valC","aluA_from"),this.genLine([671,696,671,661,580,661,580,480],6,"E_valA","aluA_from")},S.prototype.e_addRects=function(){return this.genRect(95,4,85,"M_","stat"),this.genRect(184,4,85,"M_","icode"),this.genRect(449,4,85,"M_","Cnd"),this.genRect(539,4,175,"M_","valE"),this.genRect(718,4,175,"M_","valA"),this.genRect(986,4,85,"M_","dstE"),this.genRect(1076,4,85,"M_","dstM"),this.genRect(95,700,85,"E_","stat"),this.genRect(183,700,85,"E_","icode"),this.genRect(271,700,85,"E_","ifun"),this.genRect(405,700,175,"E_","valC"),this.genRect(584,700,175,"E_","valA"),this.genRect(763,700,175,"E_","valB"),this.genRect(986,700,85,"E_","dstE"),this.genRect(1075,700,85,"E_","dstM"),this.genRect(1165,700,85,"E_","srcA"),this.genRect(1254,700,85,"E_","srcB")},S.prototype.e_addTooltips=function(){return this.genTooltip(337,383,75,100,"set_cc",0),this.genTooltip(498,383,75,105,"aluA",8),this.genTooltip(646,383,75,105,"aluB",8),this.genTooltip(834,257,75,115,"alufun",1),this.genTooltip(989,157,60,85,"e_dstE",8),this.genTooltip(1390,91,21,75,"e_valE",8),this.genTooltip(1390,121,21,77,"e_dstE",1),this.genTooltip(495,148,21,72,"e_Cnd",0),this.genTooltip(4,392,21,78,"W_stat",0),this.genTooltip(8,428,21,74,"m_stat",0)},S.prototype.e_render=function(){var e,t;return d!=null&&d.remove(),h.show(),e=new Image,t=this,e.onload=function(){var r,i;return i=800/e.width*.62,d=new n.Layer({y:50,scale:i}),r=new n.Image({width:e.width,height:e.height,image:e}),d.add(r),t.e_addLines(),t.e_addRects(),t.e_addTooltips(),v.add(d),t.show()},e.src=i+"E-M.png"},S.prototype.m_addLines=function(){return this.genLine([685,704,685,679,773,679,773,633],6,"M_valE","mem_addr_from"),this.genLine([863,704,863,650,818,650,818,633],6,"M_valA","mem_addr_from")},S.prototype.m_addRectangles=function(){return this.genRect(150,222,80,"W_","stat"),this.genRect(235,222,90,"W_","icode"),this.genRect(596,222,175,"W_","valE"),this.genRect(774,222,175,"W_","valM"),this.genRect(1041,222,85,"W_","dstE"),this.genRect(1130,222,85,"W_","dstM"),this.genRect(150,708,80,"M_","stat"),this.genRect(235,708,90,"M_","icode"),this.genRect(419,708,85,"M_","Cnd"),this.genRect(596,708,175,"M_","valE"),this.genRect(774,708,175,"M_","valA"),this.genRect(1041,708,85,"M_","dstE"),this.genRect(1130,708,85,"M_","dstM")},S.prototype.m_addTooltips=function(){return this.genTooltip(752,556,60,85,"mem_addr",8),this.genTooltip(508,376,75,115,"mem_read",0),this.genTooltip(508,473,75,115,"mem_write",0),this.genTooltip(147,324,60,85,"m_stat",0),this.genTooltip(408,316,21,136,"dmem_error",0),this.genTooltip(1413,351,21,85,"m_valM",8)},S.prototype.m_render=function(){var e,t;return d!=null&&d.remove(),h.show(),e=new Image,t=this,e.onload=function(){var r,i;return i=800/e.width*.62,d=new n.Layer({y:50,scale:i}),r=new n.Image({width:e.width,height:e.height,image:e}),d.add(r),t.m_addLines(),t.m_addRectangles(),t.m_addTooltips(),v.add(d),t.show()},e.src=i+"M-W.png"},S.prototype.strToStat=function(e){switch(e){case 0:return"BUB";case 1:return"AOK";case 2:return"HLT";case 3:return"ADR";case 4:return"INS";case 5:return"PIP";default:return"STAT"}},S.prototype.show=function(t){var n,i,s,f,l,c,h,v,m,g,E,S,x,T,N,C;t!=null&&(this.cycle=t),T=this.cycle.variables,m=this.cycle.reg,n=this.cycle.cc,S=this,i=function(e,t,n){var i;return t==="stat"?(i=S.strToStat(n),e.setText(i),i==="AOK"||i==="STAT"?e.setFill(a.black):i==="BUB"?e.setFill(a.blue):e.setFill(a.red)):n==null?e.setText(t):e.setText(t+"\n"+r.num2hex(n,r.lengthFromName(t)))};if(d.get("Image").length!==0)E=d.get("Text"),E.each(function(e){var t,n;return t=e.getName(),n=T[e.getId()],i(e,t,n),e.setY(e.getAttr("oldY")+(58-e.getHeight())/2)}),c=d.get("Line"),c.each(function(e){var t,n;return t=e.getName(),n=T[e.getAttr("from")],n===t?e.show():e.hide()});else{for(f in p){if(!e.call(p,f))continue;l=p[f],h=l.labelName,x=T[f],i(l,h,x),l.setY((25-l.getHeight())/2)}if(w.length>0){for(s=N=0;N<=7;s=++N)l=w[s],l.setText(y[s]+"\n"+r.num2hex(m[s],8)),l.setFill(a.black),v=b[s],v.setFill(a.white),l.setY(v.getY()+(25-l.getHeight())/2);g=function(e){if(e!=null&&e!==15)return b[e].setFill(a.blue)},g(T.W_dstE),g(T.W_dstM)}if(u.length>0)for(s=C=0;C<=2;s=++C)u[s].setText(o[s]+": "+(n[s]|0)),u[s].setY(10+(25-u[s].getHeight())/2)}return d.draw()},S}()})}.call(this),function(){define("app/Simulator",["./Utils"],function(e){return function(){function it(){}var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R,U,z,W,X,V,$,J,K,Q,G,Y,Z,et,tt,nt,rt;return it.prototype.report=[],it.prototype.cycles=[],K={},et={},tt={},Z={},u=0,K[u<<4]="halt",c=1,K[c<<4]="nop",g=2,K[g<<4]="rrmovl",a=3,K[a<<4]="irmovl",m=4,K[m<<4]="rmmovl",l=5,K[l<<4]="mrmovl",h=6,t=0,K[(h<<4)+t]="addl",Z[t]="+",r=1,K[(h<<4)+r]="subl",Z[r]="-",n=2,K[(h<<4)+n]="andl",Z[n]="&",i=3,K[(h<<4)+i]="xorl",Z[i]="^",f=7,T=0,K[(f<<4)+T]="jmp",S=1,K[(f<<4)+S]="jle",E=2,K[(f<<4)+E]="jl",y=3,K[(f<<4)+y]="je",x=4,K[(f<<4)+x]="jne",w=5,K[(f<<4)+w]="jge",b=6,K[(f<<4)+b]="jg",o=8,K[o<<4]="call",v=9,K[v<<4]="ret",d=10,K[d<<4]="pushl",p=11,K[p<<4]="popl",s=0,A=0,et[A]="%eax",_=1,et[_]="%ecx",P=2,et[P]="%edx",M=3,et[M]="%ebx",B=4,et[B]="%esp",O=5,et[O]="%ebp",H=6,et[H]="%esi",D=7,et[D]="%edi",j=15,et[j]="----",k=0,L=1,N=2,C=3,q=0,tt[q]="BUB",I=1,tt[I]="AOK",R=2,tt[R]="HLT",F=3,tt[F]="ADR",U=4,tt[U]="INS",z=5,tt[z]="PIP",$={op:k,elements:["F_predPC"],from:["f_predPC"]},X={op:N,elements:["D_icode","D_ifun","D_rA","D_rB","D_valC","D_valP","D_stat","D_pc"],from:["f_icode","f_ifun","f_rA","f_rB","f_valC","f_valP","f_stat","f_pc"],bubble:[c,s,j,j,void 0,void 0,q,void 0]},V={op:N,elements:["E_icode","E_ifun","E_valC","E_valA","E_valB","E_dstE","E_dstM","E_srcA","E_srcB","E_stat","E_pc"],from:["D_icode","D_ifun","D_valC","d_valA","d_valB","d_dstE","d_dstM","d_srcA","d_srcB","D_stat","D_pc"],bubble:[c,s,void 0,void 0,void 0,j,j,j,j,q,void 0]},G={op:N,elements:["M_icode","M_ifun","M_Cnd","M_valE","M_valA","M_dstE","M_dstM","M_stat","M_pc"],from:["E_icode","E_ifun","e_Cnd","e_valE","E_valA","e_dstE","E_dstM","E_stat","E_pc"],bubble:[c,s,!1,void 0,void 0,j,j,q,void 0]},rt={op:N,elements:["W_icode","W_ifun","W_valE","W_valM","W_dstE","W_dstM","W_stat","W_pc"],from:["M_icode","M_ifun","M_valE","m_valM","M_dstE","M_dstM","m_stat","M_pc"],bubble:[c,s,void 0,void 0,j,j,q,void 0]},Y=e.num2hex,J=e.hexPack,Q=0,W=0,nt=0,it.prototype.load=function(t){var n,r,i,s,o,u,a,f,l,c,h,p;a={},o=t.split("\n"),r={reg:[0,0,0,0,0,0,0,0],memory:[],variables:{},cc:[!1,!1,!1],status:I},this.cycles.splice(0),this.report.splice(0),this.cycles.push(e.gen(r)),this.cycles[0].variables.f_predPC=0;for(l=0,h=o.length;l<h;l++){s=o[l],u=s.trim().split("|");if(u.length!==2)continue;if(u[0]==="")continue;f=u[0].trim().split(/:\s?/);if(f.length!==2)return null;if(f[1]==="")continue;n=e.hex2num(f[0]),a[n]=u[1];for(i=c=0,p=f[1].length-1;c<=p;i=c+=2)this.cycles[0].memory[n++]=e.hex2num(f[1][i]+f[1][i+1])}return a},it.prototype.doReport=function(e){var t,n,r,i,s,o;return i=this.cycles[e],s=i.variables,o=i.cc,r=o[0],n=o[1],t=o[2],this.report.push(""),this.report.push("Cycle "+(e-1)+". cc = Z="+r+" S="+n+" O="+t+", STAT="+tt[i.status]),this.report.push("F: predPC = "+Y(s.F_predPC)),this.report.push("D: instr = "+K[J(s.D_icode,s.D_ifun)]+", rA = "+et[s.D_rA]+", rB = "+et[s.D_rB]+", valC = "+Y(s.D_valC)+", valP = "+Y(s.D_valP)+", Stat = "+tt[s.D_stat]),this.report.push("E: instr = "+K[J(s.E_icode,s.E_ifun)]+", valC = "+Y(s.E_valC)+", valA = "+Y(s.E_valA)+", valB = "+Y(s.E_valB)),this.report.push("   srcA = "+et[s.E_srcA]+", srcB = "+et[s.E_srcB]+", dstE = "+et[s.E_dstE]+", dstM = "+et[s.E_dstM]+", Stat = "+tt[s.E_stat]),this.report.push("M: instr = "+K[J(s.M_icode,s.M_ifun)]+", Cnd = "+s.M_Cnd+", valE = "+Y(s.M_valE)+", valA = "+Y(s.M_valA)),this.report.push("   dstE = "+et[s.M_dstE]+", dstM = "+et[s.M_dstM]+", Stat = "+tt[s.M_stat]),this.report.push("W: instr = "+K[J(s.W_icode,s.W_ifun)]+", valE = "+Y(s.W_valE)+", valM = "+Y(s.W_valM)+", dstE = "+et[s.W_dstE]+", dstM = "+et[s.W_dstM]+", Stat = "+tt[s.W_stat])},it.prototype.performStep=function(){var A,O,M,_,D,P,H,tt,it,st,ot,ut,at,ft,lt;return it=this.cycles.length,ot=this.cycles[it-1],this.cycles.push(e.gen(ot)),st=this.cycles[it],lt=st.variables,H=function(e){var t,n,r,i;i=[];for(t=n=0,r=e.elements.length-1;0<=r?n<=r:n>=r;t=0<=r?++n:--n)i.push(lt[e.elements[t]]=ot.variables[e.from[t]]);return i},at=function(e){var t,n,r,i,s;i=e.elements,s=[];for(n=0,r=i.length;n<r;n++)t=i[n],s.push(lt[t]=ot.variables[t]);return s},A=function(e){var t,n,r,i;i=[];for(t=n=0,r=e.elements.length-1;0<=r?n<=r:n>=r;t=0<=r?++n:--n)i.push(lt[e.elements[t]]=e.bubble[t]);return i},ft=function(e){switch(e.op){case k:return H(e);case L:return at(e);case N:return A(e);case C:return A(e)}},ft($),ft(X),ft(V),ft(G),ft(rt),this.doReport(it),ut=this.report,tt=function(e){return ut.push(e)},D=function(){var t,n,r,i,y,b,w;return lt.f_pc=lt.M_icode===f&&!lt.M_Cnd?lt.M_valA:lt.W_icode===v?lt.W_valM:lt.F_predPC,lt.f_pc_from=lt.M_icode===f&&!lt.M_Cnd?"M_valA":lt.W_icode===v?"W_valM":"F_predPC",lt.f_valP=lt.f_pc,lt.imem_error=!1,t=st.memory[lt.f_valP++],t==null&&(lt.imem_error=!0),lt.f_icode=lt.imem_error?c:e.high4(t),lt.f_ifun=lt.imem_error?s:e.low4(t),lt.need_regids=(r=lt.f_icode)===g||r===h||r===d||r===p||r===a||r===m||r===l,lt.need_regids?(n=st.memory[lt.f_valP++],n==null&&(lt.imem_error=!0),lt.f_rA=e.high4(n),lt.f_rB=e.low4(n)):(lt.f_rA=j,lt.f_rB=j),lt.need_valC=(i=lt.f_icode)===a||i===m||i===l||i===f||i===o,lt.need_valC&&(lt.f_valC=e.getWord(st.memory,lt.f_valP),st.memory[lt.f_valP+3]==null&&(lt.imem_error=!0),lt.f_valP+=4),lt.f_predPC=(y=lt.f_icode)===f||y===o?lt.f_valC:lt.f_valP,lt.f_predPC_from=(b=lt.f_icode)===f||b===o?"f_valC":"f_valP",lt.imem_error||tt("	Fetch: f_pc = "+Y(lt.f_pc)+", imem_instr = "+K[t]+", f_instr = "+K[J(lt.f_icode,lt.f_ifun)]),lt.instr_valid=(w=lt.f_icode)===c||w===u||w===g||w===a||w===l||w===h||w===f||w===o||w===v||w===d||w===p,lt.instr_valid||tt("	Fetch: Instruction code "+Y(t)+" invalid"),lt.f_stat=lt.imem_error?F:lt.instr_valid?lt.f_icode===u?R:I:U},M=function(){var e,t,n,r,i,s,u,c,y,b,w,E,S;return lt.d_srcA=(e=lt.D_icode)===g||e===m||e===h||e===d?lt.D_rA:(t=lt.D_icode)===p||t===v?B:j,lt.d_srcA_from=(s=lt.D_icode)===g||s===m||s===h||s===d?"D_rA":void 0,lt.d_srcB=(u=lt.D_icode)===h||u===m||u===l?lt.D_rB:(c=lt.D_icode)===d||c===p||c===o||c===v?B:j,lt.d_srcB_from=(y=lt.D_icode)===h||y===m||y===l?"D_rB":void 0,lt.d_dstE=(b=lt.D_icode)===g||b===a||b===h?lt.D_rB:(w=lt.D_icode)===d||w===p||w===o||w===v?B:j,lt.d_dstE_from=(E=lt.D_icode)===g||E===a||E===h?"D_rB":void 0,lt.d_dstM=(S=lt.D_icode)===l||S===p?lt.D_rA:j,lt.d_dstM_from=(n=lt.D_icode)===l||n===p?"D_rA":void 0,lt.d_rvalA=st.reg[lt.d_srcA],lt.d_rvalB=st.reg[lt.d_srcB],lt.d_valA=(r=lt.D_icode)===o||r===f?lt.D_valP:lt.d_srcA===lt.e_dstE?lt.e_valE:lt.d_srcA===lt.M_dstM?lt.m_valM:lt.d_srcA===lt.M_dstE?lt.M_valE:lt.d_srcA===lt.W_dstM?lt.W_valM:lt.d_srcA===lt.W_dstE?lt.W_valE:lt.d_rvalA,lt.d_valA_from=(i=lt.D_icode)===o||i===f?"D_valP":lt.d_srcA===lt.e_dstE?"e_valE":lt.d_srcA===lt.M_dstM?"m_valM":lt.d_srcA===lt.M_dstE?"M_valE":lt.d_srcA===lt.W_dstM?"W_valM":lt.d_srcA===lt.W_dstE?"W_valE":"d_rvalA",lt.d_valB=lt.d_srcB===lt.e_dstE?lt.e_valE:lt.d_srcB===lt.M_dstM?lt.m_valM:lt.d_srcB===lt.M_dstE?lt.M_valE:lt.d_srcB===lt.W_dstM?lt.W_valM:lt.d_srcB===lt.W_dstE?lt.W_valE:lt.d_rvalB,lt.d_valB_from=lt.d_srcB===lt.e_dstE?"e_valE":lt.d_srcB===lt.M_dstM?"m_valM":lt.d_srcB===lt.M_dstE?"M_valE":lt.d_srcB===lt.W_dstM?"W_valM":lt.d_srcB===lt.W_dstE?"W_valE":"d_rvalB",lt.W_dstE!==j&&(tt("	Writeback: Wrote "+Y(lt.W_valE)+" to register "+et[lt.W_dstE]),st.reg[lt.W_dstE]=lt.W_valE),lt.W_dstM!==j&&(tt("	Writeback: Wrote "+Y(lt.W_valM)+" to register "+et[lt.W_dstM]),st.reg[lt.W_dstM]=lt.W_valM),st.status=lt.W_stat===q?I:lt.W_stat},_=function(){var e,s,u,c,N,C,k,L,A,O,M,_,D,P,H,B,I,q,z,W;return C=function(e,t){var n,r,i;i=e[0],r=e[1],n=e[2];switch(t){case T:return!0;case S:return r^n|i;case E:return r^n;case y:return i;case x:return i^1;case w:return r^n^1;case b:return(r^n^1)&(i^1);default:return!1}},lt.e_Cnd=C(st.cc,lt.E_ifun),lt.E_icode===f&&(A=st.cc,u=A[0],s=A[1],e=A[2],L=lt.e_Cnd?"":"not ",tt("	Execute: instr = "+K[J(lt.E_icode,lt.E_ifun)]+", cc = Z="+u+", S="+s+", O="+e+", branch "+L+"taken")),lt.aluA=(O=lt.E_icode)===g||O===h?lt.E_valA:(D=lt.E_icode)===a||D===m||D===l?lt.E_valC:(P=lt.E_icode)===o||P===d?-4:(H=lt.E_icode)===v||H===p?4:void 0,lt.aluA_from=(B=lt.E_icode)===g||B===h?"E_valA":(I=lt.E_icode)===a||I===m||I===l?"E_valC":void 0,lt.aluB=(q=lt.E_icode)===m||q===l||q===h||q===o||q===d||q===v||q===p?lt.E_valB:(z=lt.E_icode)===g||z===a?0:void 0,lt.alufun=lt.E_icode===h?lt.E_ifun:t,k=function(e){return e|0},c=function(e,s,o){if(e==null||s==null)return void 0;switch(o){case t:return k(e+s);case r:return k(e-s);case n:return e&s;case i:return e^s;default:return void 0}},lt.e_valE=c(lt.aluA,lt.aluB,lt.alufun),tt("	Execute: ALU: "+Z[lt.alufun]+" "+Y(lt.aluA)+" "+Y(lt.aluB)+" --> "+Y(lt.e_valE)),N=function(n,i,o){var a,f;return f=c(n,i,o),u=f===0,s=k(f)<0,a=function(){var e;e=function(e){return k(e)<0};switch(o){case t:return e(n)===e(i)&&e(f)!==e(i);case r:return e(n)!==e(i)&&e(f)!==e(i);default:return!1}},e=a(),[u,s,e]},lt.set_cc=lt.E_icode===h&&(W=lt.m_stat)!==F&&W!==U&&W!==R&&(M=lt.W_stat)!==F&&M!==U&&M!==R,lt.set_cc&&(st.cc=N(lt.aluA,lt.aluB,lt.alufun),_=st.cc,u=_[0],s=_[1],e=_[2],tt("	Execute: New cc = Z="+u+" S="+s+" O="+e)),lt.e_valA=lt.E_valA,lt.e_dstE=lt.E_icode===g&&!lt.e_Cnd?j:lt.E_dstE},P=function(){var t,n,r,i,s,u;return lt.dmem_error=!1,lt.mem_addr=(t=lt.M_icode)===m||t===d||t===o||t===l?lt.M_valE:(n=lt.M_icode)===p||n===v?lt.M_valA:void 0,lt.mem_addr_from=(r=lt.M_icode)===m||r===d||r===o||r===l?"M_valE":(i=lt.M_icode)===p||i===v?"M_valA":void 0,lt.mem_read=(s=lt.M_icode)===l||s===p||s===v,lt.mem_read&&(lt.m_valM=e.getWord(st.memory,lt.mem_addr),st.memory[lt.mem_addr+3]==null&&(lt.dmem_error=!0),lt.dmem_error||tt("	Memory: Read "+Y(lt.m_valM)+" from "+Y(lt.mem_addr))),lt.mem_write=(u=lt.M_icode)===m||u===d||u===o,lt.mem_data=lt.M_valA,lt.mem_write&&(e.setWord(st.memory,lt.mem_addr,lt.mem_data),st.memory[lt.mem_addr+3]==null&&(lt.dmem_error=!0),lt.dmem_error||tt("	Memory: Wrote "+Y(lt.mem_data)+" to "+Y(lt.mem_addr))),lt.dmem_error&&tt("	Memory: Invalid address "+Y(lt.mem_addr)),lt.m_stat=lt.dmem_error?F:lt.M_stat},O=function(){var e,t,n,r,i,s,o,u,a,c,h,d,m,g,y,b,w,E,S;return m=function(e,t,n){return t?n?C:L:n?N:k},h=((y=lt.E_icode)===l||y===p)&&((b=lt.E_dstM)===lt.d_srcA||b===lt.d_srcB),g=v===lt.D_icode||v===lt.E_icode||v===lt.M_icode,d=lt.E_icode===f&&!lt.e_Cnd,s=h||g,i=0,$.op=m("fetch",s,i),t=h,e=d||!h&&g,X.op=m("decode",t,e),r=0,n=d||h,V.op=m("execute",r,n),u=0,o=(w=lt.m_stat)===F||w===U||w===R||(E=lt.W_stat)===F||E===U||E===R,G.op=m("memory",u,o),c=(S=lt.W_stat)===F||S===U||S===R,a=0,rt.op=m("write-back",c,a)},$.op===C&&(lt.F_stat=z),X.op===C&&(lt.D_stat=z),V.op===C&&(lt.E_stat=z),G.op===C&&(lt.M_stat=z),rt.op===C&&(lt.W_stat=z),D(),P(),_(),M(),O(),lt.W_stat!==q?(nt=!1,++Q,++W):nt||++W,st.status},it.prototype.run=function(){var e,t,n,r,i,s,o,u,a,f,l;u=0,r=0,Q=W=0,nt=!0,this.report.push("Y86 Processor: Y86-CoffeeScript Full"),this.report.push(""+this.cycles[0].memory.length+" bytes of code read");for(;;){f=this.performStep(),f!==q&&++u,++r;if(f!==I&&f!==q)break}return this.report.push(""+u+" instructions executed"),this.report.push("Status = "+tt[f]),a=this.cycles.length,l=this.cycles[a-1].cc,n=l[0],t=l[1],e=l[2],this.report.push("Condition Codes: Z="+n+" S="+t+" O="+e),this.report.push("Changed Register State:"),o=function(e,t,n){var r,i,s,o;o=[];for(r=i=0,s=n.length-1;0<=s?i<=s:i>=s;r=0<=s?++i:--i)o.push(e.push(""+et[r]+":   "+Y(0,8)+"  "+Y(n[r],8)));return o},o(this.report,this.cycles[0].reg,this.cycles[a-1].reg),this.report.push("Changed Memory State:"),s=function(e,t,n){var r,i,s,o,u,a;a=[];for(r=o=0,u=n.length-1;0<=u?o<=u:o>=u;r=0<=u?++o:--o)i=Y(t[r],8),s=Y(n[r],8),i!==s?a.push(e.push(""+Y(r,4)+": "+i+" "+s)):a.push(void 0);return a},s(this.report,this.cycles[0].memory,this.cycles[a-1].memory),i=Q>0?W/Q:1,this.report.push("CPI: "+W+" cycles/"+Q+" instructions = "+i.toFixed(2))},it}()})}.call(this),function(){var e={}.hasOwnProperty;define("app/main",["jquery","FileSaver","./Painter","./Simulator","./Utils"],function(t,n,r,i,s){var o,u,a,f,l,c,h,p,d;return f=new r("container"),d=new i,a=1,c=!1,o=function(e){var n;return n=t(e),n.on("dragenter dragover",function(e){return e.stopPropagation(),e.preventDefault(),n.css("border-color","#8ED8F8"),!1}),n.on("dragleave",function(e){return e.stopPropagation(),e.preventDefault(),n.css("border-color","#000000"),!1}),n.on("drop",function(e){var t;return e.stopPropagation(),e.preventDefault(),n.css("border-color","#000000"),t=e.originalEvent.dataTransfer.files,u(n,t),!1})},u=function(n,r){var i,o;return i=r[0],o=new FileReader,o.onload=function(r){var i,o,u,a,f,l;i=d.load(r.target.result),d.run(),u=d.report.join("\n"),console.log(u),a=t("<table>");for(o in i){if(!e.call(i,o))continue;l=i[o],f=t("<tr>").attr("id","line_"+o),f.append(t("<td>").html(s.num2hex(o,3)).addClass("line-no")),f.append(t("<td>").addClass("status")),f.append(t("<td>").append(t("<pre>").html(l)).addClass("code")),a.append(f)}return n.html(a),p(1)},o.readAsText(i)},h=function(e){var t;return t=new Blob([e],{type:"text/plain;charset=utf-8"}),n(t,"report.txt")},t("#report").click(function(){return d.report.length===0?alert("Please load the yo file first!"):h(d.report.join("\n"))}),p=function(e){var n,r,i,s,o,u;t("#cycle_index").html(e-1),f.show(d.cycles[e]),u=d.cycles[e].variables,t("#code .status").empty(),t("#code .code").removeClass("highlight"),u.f_pc!=null&&(o=t("#line_"+u.f_pc),o.find(".status").html("F"),o.find(".code").addClass("highlight")),u.D_pc!=null&&t("#line_"+u.D_pc+" .status").html("D"),u.E_pc!=null&&t("#line_"+u.E_pc+" .status").html("E"),u.M_pc!=null&&t("#line_"+u.M_pc+" .status").html("M"),u.W_pc!=null&&t("#line_"+u.W_pc+" .status").html("W");if(t(".highlight").length===1)return n=t("#code").get(0).clientHeight,r=t(".highlight").offset().top-t("#code").offset().top,s=t("#code").get(0).scrollTop,i=t("#code").get(0).scrollHeight,r<0&&(s=Math.max(0,s+r-n/2)),r>n&&(s=Math.min(s+r-n/2,i)),t("#code").get(0).scrollTop=s},t(function(){return f.render(),o("#code")}),t("#next").on("click",function(){return a+1>=d.cycles.length?alert("程序运行结束！"):p(++a)}),t("#prev").on("click",function(){return a===1?alert("程序已经在第一个cycle！"):p(--a)}),l=function(){a+1>=d.cycles.length&&t("#play").trigger("click");if(!c)return;return p(++a),setTimeout(l,2100-t("#speed").val())},t("#play").on("click",function(){return c=!c,c?(t(this).html("pause"),l()):t(this).html("play")}),t("#stage").change(function(){switch(t(this).val()){case"f":return f.f_render();case"d":return f.d_render();case"e":return f.e_render();case"m":return f.m_render();default:return f.renderMain()}}),t("#mem_submit").click(function(){var e,n;return e=t("#mem_addr").val(),n=d.cycles[a].memory[s.hex2num(e)],n=s.num2hex(n,8),alert("The content of address: "+e+"\nis "+n+"."),t("#mem_addr").val("")}),t(window).on("resize",function(){return this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){return t(this).trigger("resizeEnd")},200)}),t(window).on("resizeEnd orientationChange",function(){return t("#container").empty(),f.render()})})}.call(this);