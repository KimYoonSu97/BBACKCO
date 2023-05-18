$(document).ready(function () {
  comment();
  member();
  close_box();
  like();
});
// 좋아요를 DB에서 가져와서 출력합니다.
function like() {
  fetch("/like")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      // console.log(rows);

      $("#likeArea").empty()

      rows.forEach((a) => {
        let like = a["likeNum"];

        let temp_html = `
        <span id="like-count">${like}</span>
        <a>개의 응원이 모였어요</a>`;

        $('#likeArea').append(temp_html)
      });
      });
    }

// 멤버 정보를 DB에서 가져와서 출력합니다.
function member() {
  fetch("/members")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      // console.log(rows);

      $("#member").empty();

      rows.forEach((a) => {
        let name = a["name"];
        let img = a["img"];
        let merits = a["merits"];
        let selfIntro = a["selfIntro"];
        let style = a["style"];
        let blog = a["blog"]

        let temp_html = `
      
        <li id="${name}" class="slideitem">
        <a>
            <section id="member">
                <div id="${name}">
                    <div class="member-inner">
                        <h2>${name}</h2>
                        <div class="member-box">
                            <div class="member-img">
                                 <img src="${img}" alt="${name}">
                            </div>
                            <div class="member-txt-box">
                                <div class="member-info">
                                    <h3>자기소개👀</h3>
                                    <p class="white-box">
                                        ${selfIntro}
                                    </p>
                                </div>
                                <div class="member-strength">
                                    <h3>자신의 장점🤗</h3>
                                    <p class="white-box">
                                         ${merits}
                                    </p>
                                </div>
                                <div class="member-style">
                                    <h3>협업 스타일🧑‍💻</h3>
                                    <p class="white-box">${style}</p>
                                </div>
                                <div class="member-style">
                                <h3>블로그 링크📓</h3>
                                <p class="blogLink" onclick=window.open("${blog}")>바로가기👉</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </a>
    </li>
    `;
        $(".slidelist").append(temp_html);
      });
    });
}

// 댓글을 DB에서 모두 가져와서 출력합니다.
function comment() {
  fetch("/comments")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      // console.log(rows);

      $("#comment-show").empty();

      rows.forEach((a) => {
        let name = a["name"];
        let comment = a["comment"];
        let fire = a["fire"];

        let fireImage = "🔥".repeat(fire);

        let temp_html = `<tr>
                          <td>${name}</td>
                          <td>${fireImage}</td>
                          <td>${comment}</td>
                        </tr>`;
        $("#comment-show").append(temp_html);
      });
    });
}

// 댓글 작성 유효성 검사 함수
function save_form() {
  let checkName = $("#name");
  let checkFire = $("#fire");
  let checkComment = $("#comment");

  if (!checkName.val()) {
    //  frn의 product의 value값이 없을 때 = input에 입력한 값이 없을 때
    alert("닉네임을 입력해 주세요");
    checkName.focus();
    return false; //  경고창을 확인한 후 페이지가 넘어가지 않고 그대로 유지하기 위함, method빼면 못넘어감.
  } else if (checkFire.val() == 0) {
    alert("응원 지수를 선택해 주세요");
    checkFire.focus();
    return false;
  } else if (!checkComment.val()) {
    alert("응원의 말을 입력해 주세요");
    checkComment.focus();
    return false;
  } else {
    let name = $("#name").val();
    let fire = $("#fire").val();
    let comment = $("#comment").val();

    let formData = new FormData();
    formData.append("name_give", name);
    formData.append("comment_give", comment);
    formData.append("fire_give", fire);

    fetch("/comments", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        console.log(data["msg"]);
        alert(data["msg"]);
        window.location.reload();
      });
  }
}

// 좋아요 숫자를 늘려주는 함수를 만들것입니다...

// 이 라이크넘버는... html에서 가져와야해..숫자를 윤수야...


// 라이크 아이콘을 누르면 이 함수가 실행될꺼야....
function PlusLikeNum() {

  let countEl = $("#like-count");
  let likeNum = Number(countEl.text());
  // console.log(typeof likeNum);

  // 가져온 라이크넘버에숫자 1을 더해
  likeNum = likeNum + 1;
  // 그리고 바로 출력해 // 이건 성공!
  $("#like-count").text(likeNum);

  // 이제 이걸 db에 보내야해
  let formData = new FormData();
  formData.append("like-plus", likeNum);

  fetch("/like", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      console.log(data["msg"]);
    });
}

// 좋아요 숫자 를 출력해주는 함수





// 빡코더 되기 열기 버튼
function open_box() {
  $("#post-box").show();
}

// 빡코더 되기 닫기 버튼
function close_box() {
  $("#post-box").hide();
}
