import { Component } from '../core/component'
import {apiService} from "../services/api.service";
import {TransformService} from "../services/transform.service";


export class PostsComponent extends Component {
  constructor(id) {
    super(id)
    console.log("Posts");
  }

  async onShow() {
    console.log("asdasd");
    let fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    const html = posts.map(post => renderPost(post));
    console.log(html.join(" "));
    this.$el.insertAdjacentHTML("afterbegin", html.join(" "));
  }

  onHide() {
    this.$el.innerHTML = "";
  }

}

function renderPost(post) {
  const button = "<button class = 'button-round button-small button-primary'>Сохранить</button>";
  return `
    <div class="panel">
    <button data-remove = "true">Удалить</button>
        <div class="panel-head">
          <p class="panel-title">${post.title}</p>
          <ul class="tags">
            <li class="tag tag-blue tag-rounded">${checkType(post)}</li>
          </ul>
        </div>
        <div class="panel-body">
          <p class="multi-line">${post.fulltext}</p>
        </div>
        <div class="panel-footer w-panel-footer">
          <small>12.12.12</small>
          ${button}
        </div>
      </div>
    `
}




function checkType(post) {
  if (post.type == "note") {
    return "Заметка";
  } else {
    return "Новость";
  }
}



