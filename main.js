var dave_chen={
    upload_logo:document.getElementById("upload-logo"),
    can_move:false,
    preposition:"",
    nowposition:"",
    target_eleid:"",
    init:function(){
        if (this.upload_logo.attachEvent) {
            this.upload_logo.attachEvent('onchange',function(){
                this.addlogo()
            }.bind(this),false);
        }else{
            this.upload_logo.addEventListener("change",function(){
                this.addlogo()
            }.bind(this),false);
        }


        if(document.attachEvent){
            document.attachEvent("onmousedown",function(ev){
                ev=ev||window.event;
                this.mousedownfunc(ev);
            }.bind(this));
            document.attachEvent("onmousemove",function(ev){
                ev=ev||window.event;
                this.mousemovefunc(ev);
            }.bind(this));
            document.attachEvent("onmouseup",function(ev){
                ev=ev||window.event;
                this.mouseupfunc(ev);
            }.bind(this));
        }else{
            document.addEventListener("mousedown",function(ev){
                ev=ev||window.event;
                this.mousedownfunc(ev);
            }.bind(this));
            document.addEventListener("mousemove",function(ev){
                ev=ev||window.event;
                this.mousemovefunc(ev);
            }.bind(this));
            document.addEventListener("mouseup",function(ev){
                ev=ev||window.event;
                this.mouseupfunc(ev);
            }.bind(this));
        }
    },
    mousedownfunc:function(ev){
        var target=ev.target||ev.srcElement;
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue=false;
        }
        if(target.id!=""&&target.id!=null&&target.id.indexOf("logo")>=0){
            this.can_move=true;
            this.target_eleid=target.id;
            this.preposition={
                "x":ev.screenX,
                "y":ev.screenY
            }
        }
    },
    mousemovefunc:function(ev){
        if(this.can_move){
            if(ev.preventDefault){
                ev.preventDefault();
            }else{
                ev.returnValue=false;
            }
            this.nowposition={
                "x":ev.screenX,
                "y":ev.screenY
            };
            var target_ele = document.getElementById(this.target_eleid);
            target_ele.style.top=(this.nowposition.y-this.preposition.y)+"px";
            target_ele.style.left=(this.nowposition.x-this.preposition.x)+"px";
        }
    },
    mouseupfunc:function(ev){
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue=false;
        }
        if(!this.can_move){
            return;
        }
        this.can_move=false;
        var target_ele = document.getElementById(this.target_eleid);
        var logolist = document.getElementById("list-logo");
        if(target_ele.className==""||target_ele.className==null){
            this.check(target_ele,logolist,false);
        }else if(target_ele.className=="active"){
            this.check(target_ele,logolist,true);
        }
    },
    check:function(target_ele,logolist,flag){
        if(this.nowposition!=""&&this.nowposition!=null){
            var x_index = Math.floor((this.nowposition.x-100)/100);
            var y_index = Math.floor((this.nowposition.y-100)/100);
            console.log(x_index,y_index)
            if(1<=x_index&&x_index<4&&1<=y_index&&y_index<4){
                var content=logolist.getElementsByTagName("ul")[0].getElementsByTagName("li")[(y_index-1)*4+x_index].innerText||logolist.getElementsByTagName("ul")[0].getElementsByTagName("li")[(y_index-1)*4+x_index].innerHTML;

                if(content!=""){
                    target_ele.style.top="";
                    target_ele.style.left="";
                }
                else{
                    logolist.getElementsByTagName("ul")[0].getElementsByTagName("li")[(y_index-1)*4+x_index].appendChild(document.getElementById(this.target_eleid));
                    target_ele.style.top="";
                    target_ele.style.left="";
                    target_ele.className="active";
                    document.getElementById("div-"+this.target_eleid).style.display="none";
                }
            }else{
                if(!flag){
                    target_ele.style.top="";
                    target_ele.style.left="";
                }else{
                    this.checkback(target_ele);
                }

            }
        }
    },
    checkback:function(target_ele){
        console.log('aaa');
        var x_offset = this.nowposition.x-document.getElementById("div-"+this.target_eleid).parentNode.offsetLeft;
        var y_offset = this.nowposition.y-document.getElementById("div-"+this.target_eleid).offsetTop;
        console.log(document.getElementById("div-"+this.target_eleid).parentNode.offsetLeft,y_offset);
        if(0<=x_offset&&x_offset<210&&0<=y_offset&&y_offset<370) {
            document.getElementById("div-"+this.target_eleid).appendChild(target_ele);
            target_ele.style.top="";
            target_ele.style.left="";
            target_ele.className="";
            document.getElementById("div-"+this.target_eleid).style.display="block";
        }else{
            target_ele.style.top="";
            target_ele.style.left="";
        }
    },
    addlogo:function(){
        var img_src=this.upload_logo.value;
        var img_index = img_src.indexOf("img");
        var img_relsrc="imgs/"+img_src.substring(img_index);
        if(!!window.ActiveXObject || "ActiveXObject" in window){
            img_relsrc="imgs/"+img_src.substring(img_src.indexOf("imgs")).substring(img_src.substring(img_src.indexOf("imgs")).indexOf("\\")+1);
        }
        var add_div=document.createElement("div");
        var add_img=document.createElement("img");
        add_img.src=img_relsrc;
        add_img.id="logo"+img_src.substring(img_src.indexOf(".")-1,img_src.indexOf("."));
        var all_imgs=document.getElementsByTagName("img");
        var img_length = all_imgs.length;
        var reapeat_num=0;
        for(var i=0;i<img_length; i++){
            if(all_imgs[i].id==add_img.id){
                reapeat_num++;
            }
        }
        if(reapeat_num>0){
            alert("this logo has exit");
        }else{
            add_div.id="div-"+add_img.id;
            add_div.appendChild(add_img);
            document.getElementById("logo-content").appendChild(add_div);
        }
    }
};
dave_chen.init();
