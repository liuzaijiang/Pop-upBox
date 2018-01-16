(function () {
	function popUpBox(obj) {
		if (!obj) {
			throw new Error('Please fill in the initialization variable!(Pop-upBox.js)')
		}
		this.language = obj.language || 1; //0为英文,1为中文
		this.type = 1; //1为添加用户,0为修改用户
		this.init();
	}

	popUpBox.prototype = {
		init : function () {
			var popUpBoxString = '\
				    <div class="backDrop"></div>\
				    <div class="PBox">\
				     <div class="PBoxWrap">\
				         <div class="PBox-content">\
				            <div class="PBox-header">\
                                <img id="userImg"></img>\
				                <h4 class="PBox-title"></h4>\
				                <div class="close">\
				                    <img src="images/close.png"></img>\
				                </div>\
				            </div>\
				            <div class="PBox-body">\
				                <div class="PBox-body-unit addUser">\
				                    <label><%=userTpye%></label>\
				                    <div class="userTypeSelectDiv">\
				                        <input name="privilege" id ="privilege1" type="radio" value="4" checked><%=normalUser%>\
				                        <input name="privilege" type="radio" value="5"><%=operator%>\
				                    </div>\
				                </div>\
				                <div class="PBox-body-unit">\
				                    <label><%=userName%></label>\
				                    <input id="pb-userName" type="text">\
				                </div>\
				                <div class="PBox-body-unit addUser">\
				                    <label><%=password%></label>\
				                    <input id="addPassword1" type="password">\
				                </div>\
				                <div class="PBox-body-unit addUser">\
				                    <label><%=confirmPassword%></label>\
				                    <input id="addPassword2" type="password">\
				                </div>\
				                <div class="PBox-body-unit changeUser">\
				                    <label><%=oldPassword%></label>\
				                    <input id="oldPassword" type="password">\
				                </div>\
				                <div class="PBox-body-unit changeUser">\
				                    <label><%=newPassword%></label>\
				                    <input id="newPassword" type="password">\
				                </div>\
				                <div class="PBox-body-unit changeUser">\
				                    <label><%=confirmNewPassword%></label>\
				                    <input id="confirmNewPassword" type="password">\
				                </div>\
				            </div>\
				            <div class="PBox-footer">\
				               <div class="btn-group">\
				                <button class="btn" id="setBtn"><%=setBtnName%></button>\
				               </div>\
				            </div>\
				         </div>\
				      </div>\
				    </div>';
			var self = this;
			var lan = self.language;
			var obj = {
				'userTpye' : ["User Type", "用户类型"][lan],
				'normalUser' : ["Normal User", "普通用户"][lan],
				'operator' : ["Operator", "操作员"][lan],
				'userName' : ["User Name", "用户名称"][lan],
				'password' : ["Password", "密码"][lan],
				'confirmPassword' : ["Confirm Password", "确认密码"][lan],
				'oldPassword' : ["Old Password", "旧密码"][lan],
				'newPassword' : ["New Password", "新密码"][lan],
				'confirmNewPassword' : ["Confirm New Password", "确认新密码"][lan],
				'setBtnName' : ["Confirm", "确定"][lan]
			}
			popUpBoxString = _.template(popUpBoxString);
			var dom = popUpBoxString(obj);
			$("body").append(dom);
			$(".backDrop").css("opacity", 0.3);
			this.bindEvents();
		},
		show : function (type) {
			var self = this;
			var lan = self.language;
			self.type = type == "add" ? 1 : 0;
            
			if (self.type) {
                $("#userImg").attr("src","images/add.png");
				$(".changeUser").hide();
				$(".addUser").show();             
				$(".PBox-title").text([["Modify the user", "修改用户"][lan], ["Add user", "添加用户"][lan]][self.type])
			} else {
                $("#userImg").attr("src","images/change.png");
				$(".changeUser").show();
				$(".addUser").hide();
				$(".PBox-title").text([["Modify the user", "修改用户"][lan], ["Add user", "添加用户"][lan]][self.type])
			}
            $("#pb-userName,.PBox-body-unit input[type=password]").val("");
			$(".PBox").css("left", 0);
			$(".backDrop").show();           
			$(".errMsg").remove();
		},
		hide : function () {
			$(".PBox").css("left", "100%");
			$(".backDrop").hide();
			$(".errMsg").remove();
		},
		bindEvents : function () {
			var self = this;
			$(".PBox-header .close").click(function () {
				self.hide();
			})

			//消除删除回退事件
			$("#pb-userName").keydown(function (event) {
				var doPrevent = false;
				if (event.keyCode === 8) {
					var d = event.target;
					doPrevent = d.readOnly || d.disabled;
				}
				if (doPrevent) {
					event.preventDefault();
				}
			})
		}
	}

	popUpBox.prototype.constructor = popUpBox;
	window.popUpBox = popUpBox;
})()
