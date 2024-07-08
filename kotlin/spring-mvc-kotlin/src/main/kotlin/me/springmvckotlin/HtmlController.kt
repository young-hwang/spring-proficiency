package me.springmvckotlin

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@Controller
class HtmlController(private val repository: ArticleRepository) {

    @GetMapping("/")
    fun blog(model: Model): String {
        model["title"] = "Blog"
        model["articles"] = repository.findAllByOrderByAddedAtDesc().map { it.render()}
        return "blog"
    }

    @GetMapping("/article/{slug}")
    fun article(@PathVariable slug: String, model: Model): String {
        val article = repository.findBySlug(slug)?.render()?:throw ResponseStatusException(HttpStatus.NOT_FOUND, "This article does not exist")
        model["title"] = article.title
        model["article"] = article
        return "article"
    }
}

@RestController
@RequestMapping("/api/user")
class UserController(private val repository: UserRepository) {
    @GetMapping("/")
    fun findAll() = repository.findAll()


}


fun Article.render() = RenderArticle(
    slug,
    title,
    headline,
    content,
    author,
    addedAt.format()
)

data class RenderArticle(
    val slug: String,
    val title: String,
    val headline: String,
    val content: String,
    val author: User,
    val addedAt: String
)
