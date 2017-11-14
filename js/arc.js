
var _id =0;//初始ID
var _lastid;//最后传入ID
var numjson={};
var _interval ={};
var _lucknum =1;


//格式化背景图
function formatbg(){
	var bg;
	var bgleft =0;
	var bgtop =0;
	for(i=0; i<200; i++){
					var k=i+1;
					bg = 'bg'+i;
					var defaultimg;
					
						if(i<20){
							bgleft = i*96+'px';
							defaultimg ='style="background-position:-'+bgleft+' -'+bgtop+'"';
						}
						else if(i>=20 && i<40){
							bgleft = (i-20)*96+'px';
							bgtop = '108px';
							defaultimg ='style="background-position:-'+bgleft+' -'+bgtop+'"';
						}
						else if(i>=40 && i<60){
							bgleft = (i-40)*96+'px';
							bgtop = (108*2)+'px';
							defaultimg ='style="background-position:-'+bgleft+' -'+bgtop+'"';
						}
						else if(i>=60 && i<80){
							bgleft = (i-60)*96+'px';
							bgtop = (108*3)+'px';
							defaultimg ='style="background-position:-'+bgleft+' -'+bgtop+'"';
						}
						else if(i>=80 && i<100){
							bgleft = (i-80)*96+'px';
							bgtop = (108*4)+'px';
							defaultimg ='style="background-position:-'+bgleft+' -'+bgtop+'"';
						}
						else if(i>=100 && i<120){
							bgleft = (i-100)*96+'px';
							bgtop = (108*5)+'px';
							defaultimg ='style="background-position:-'+bgleft+' -'+bgtop+'"';
						}
						else if(i>=120 && i<140){
							bgleft = (i-120)*96+'px';
							bgtop = (108*6)+'px';
							defaultimg ='style="background-position:-'+bgleft+' -'+bgtop+'"';
						}
						else if(i>=140 && i<160){
							bgleft = (i-140)*96+'px';
							bgtop = (108*7)+'px';
							defaultimg ='style="background-position:-'+bgleft+' -'+bgtop+'"';
						}
						else if(i>=160 && i<180){
							bgleft = (i-160)*96+'px';
							bgtop = (108*8)+'px';
							defaultimg ='style="background-position:-'+bgleft+' -'+bgtop+'"';
						}
						else if(i>=180 && i<200){
							bgleft = (i-180)*96+'px';
							bgtop = (108*9)+'px';
							defaultimg ='style="background-position:-'+bgleft+' -'+bgtop+'"';
						}
					var imgbg = '<div class="absolute transition bg" id="'+bg+'"><div class="absolute img z0 transition" '+defaultimg+'></div></div>'
					$('#main').append(imgbg);
					$('#'+bg).delay(50*i).animate({'top':bgtop,'left':bgleft,'opacity':'1'},0);
				}
				//背景图加载完开始执行
				setTimeout(function(){
					$('body').css({'background':'url(images/bg01.png)'});
				},11000);//默认延迟11000
				
				//背景图加载完开始执行
				setTimeout(function(){	
					//getdata();//真实数据
					demo();//测试数据			
				
				},2000);//默认延迟11000
				
}


function getdata(){
	setInterval(function(){
		if(_lastid!=_id){
			//console.log('demo'+_lastid);
			loaddata(_id);
		}
			//console.log('demo'+_lastid);
	},5000);
}
//组装数据
function loaddata(id){		
	$.get("http://nianhui.lyarc.com/QYPhone/QuerySignUser?id="+id,function(data){	
		if(data.length>0){
		
		_lastid = id;
		
		GetDataHtml(data);
		//console.log(data.length);	
		}
		},"json");
}

//组装列表HTML
	function GetDataHtml(data) {
		var length = data.length;
		var html = [];
		if (length > 0) {
			var i=0;
			var item;
			if(i<length){
			 var interval= setInterval(function(){	
				item = data[i];
				var id = item.id;
				var image_head = 'http://'+item.ip+':8888/'+item.image_head; 
				var image_sign = 'http://'+item.ip+':8888/'+item.image_sign; 
				
				var wz = id -1;
				photo(image_head,wz);		
				card(image_sign,wz);				
				i++;
				if(id==200){//达到200，跳转背景图
					setTimeout(function(){				
						$('.card').remove();
						$('#main').css({'transform': 'scale(3)'}).animate({'opacity':'0'},1000);
					},6000);
				}
			  	//console.log(i+'---'+image_head+'---'+image_sign);
				if(i==length){
					clearInterval(interval);//终止循环
					
					console.log(id);
					_id = id;
				}
				
			},6000);
							
				}
			return html.join(" ");	
		} 
	} 


//模拟		
function demo(){
	var i =0;
	var j = 1;
	setInterval(function(){
		card('images/heka.jpg',i);
		photo('images/img/img'+j+'.jpg',i);		
		if(i<199){	
			if(j<6){
				j++
			}else{
				j=1;
				j++;
			}	
		i++;	
		}else{
			setTimeout(function(){				
		$('.card').remove();
		$('#main').css({'transform': 'scale(3)'}).animate({'opacity':'0'},1000);
			},6000);
		}
	},6000);//默认6000
}

//加载贺卡
function card(url,position){	
	var num = $('#num200 span').eq(position).html();	
	var cardtop = $('#bg'+num).css('top');
	var cardleft = $('#bg'+num).css('left');
	
	var html = '<img src="'+url+'">'
	$('.card').html(html);
	$('.card').css({'width':'1000px','height':'504px'}).animate({'top':'25%','left':'23%','opacity':'1'},300);
	setTimeout(function(){		
		$('.card').css({'width':'96px','height':'108px'}).animate({'top':cardtop,'left':cardleft,'opacity':'0'},300);		
	},4000);
	setTimeout(function(){	
	$('.card').attr('style','');
	},5500);
	
	
}

//加载单张照片
function photo(url,id){
	var num = $('#num200 span').eq(id).html();
	var img = '<img src="'+url+'" class="absolute img transition z1" width="96">';
	setTimeout(function(){
	$('#bg'+num).append(img);		
	$('#bg'+num+' .z0').css({'transform':'rotateY(-180deg)'}).animate({'opacity':'1'},800);
	$('#bg'+num+' .z1').css({'transform':'rotateY(180deg)'}).animate({'opacity':'1'},800);
	},4400);
}

//生成200个随机数
function Random200(){
	
	var arr = [];
	for(i=0;i<200;i++){		
	arr.push('<span>'+i+'</span>'); 
	}; 
	var arr2 = arr.sort(randomsort);  
  	//alert(arr2);
 $('#num200').html(arr2);
	}
function randomsort(a, b) {  
        return Math.random()>.5 ? -1 : 1;  
//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1  
}  

//生成随机数
function createRandom(num , from , to)
{
    var arr=[];
    while(arr.length<num)
    {
        //产生单个随机数
        var ranNum=Math.ceil(Math.random()*(to-from))+from;
        //通过判断json对象的索引值是否存在 来标记 是否重复
        if(!numjson[ranNum])
        {
            numjson[ranNum]=1;
            arr.push(ranNum);
        }
         
    }
    return arr;       
}

//抽奖程序
function searchluck(){
	$.get("http://nianhui.lyarc.com/QYPhone/QuerySignUser?seq=0",function(data){	
		if(data.length>0){
			console.log('总：'+data.length);
			}
		},"json");
}


//抽奖程序
function luck(){					
				
	$.get("http://nianhui.lyarc.com/QYPhone/QuerySignUser?seq=0",function(data){	
		if(data.length>0){	
			_lucknum = data.length;
			if(_lucknum!=null){			
	var title = $('#button').attr('title');
	if(title=="开始抽奖"){
		$('#title').html('猜猜我是谁');
		$('#button').removeClass('button_on').addClass('button_off').text('STOP');
		$('#button').attr('title','停止');
		loadluck();
	}
	if(title=="停止"){
		_lucknum = data.length;
		$('#button').removeClass('button_off').addClass('button_on').text('开始抽奖');
		$('#button').attr('title','开始抽奖');	
		clearInterval(_interval);
		goodluck();
	}
	
			}else{
				alert('所有人都已中奖，不能继续抽奖！')
			}
		}else{
				alert('所有人都已中奖，不能继续抽奖！')
			}
		},"json");
	
	
}


//抽取幸运数据
function goodluck(){		
	$.get("http://nianhui.lyarc.com/QYPhone/QuerySignUser",function(data){	
		if(data.length>0){
			//var num = 1;
			var num = createRandom(1,0,data.length);
			num--;
			console.log(num+'---还有：'+data.length);
			//alert(num);
			var html,title,id,seq;
			//测试数据
			//html = '<span id="img2" class="transition"><img src="images/img/img1.jpg"></span>';
			//title = '马大林';			
			
			id = data[num].id;
			image_head = 'http://'+data[num].ip+':8888/'+data[num].image_head; 
			html = '<img src="'+image_head+'">';
			title = data[num].name;	
			seq = data[num].seq;
			if(seq==1){
			goodluck();	
				return false;
			}
			
			$('#img').html(html);
			$('#title').html(title);	
			setTimeout(function(){
				goodluckuser(id);//标记抽中人员				
			},100);
			
			
		}
		},"json");
}

//标记抽中人员
function goodluckuser(id){
	$.post("http://nianhui.lyarc.com/QYPhone/UpdateSeq?id="+id+'&seq=1',function(data){	
		},"json");
}

//组装抽奖数据
function loadluck(){		
	$.get("http://nianhui.lyarc.com/QYPhone/QuerySignUser",function(data){	
		if(data.length>0){
			//console.log(data.length);
			GetLuckHtml(data)
		}
		},"json");
}


//组装抽奖列表HTML
	function GetLuckHtml(data) {
		var length = data.length;
		var html = [];
		if (length > 0) {
			var i=0;
			var j=1;
			var item;
			if(i<length){
			 _interval= setInterval(function(){	
				item = data[i];
				var id = item.id;
				var image_head = 'http://'+item.ip+':8888/'+item.image_head; 
				var image_sign = 'http://'+item.ip+':8888/'+item.image_sign; 	
				var imgurl;
				
								
				//测试数据
				/*imgurl = '<img src="../images/img/img'+j+'.jpg">';
				if(j<5){
					j++
				}else if(j>4){
					j--;
				}*/
				
				
				imgurl = '<img src="'+image_head+'">';//真实数据
				
				$('#img').html(imgurl);			
				i++;	
			  	//console.log(i+'---'+image_head+'---'+image_sign);
				if(i==length){
				clearInterval(_interval);
					GetLuckHtml(data);
					//i--;		
				 	
				}
				
				
			},50);
							
				}
				
			return html.join(" ");	
		} 
	} 

