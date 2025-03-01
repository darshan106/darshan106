# 📄 blog-post-workflow.yml

This workflow is a **GitHub Actions automation** that fetches and updates the **latest blog posts** from your blog (via RSS feeds) into your **GitHub profile README**.

## 📌 Purpose

Keep your GitHub profile dynamically updated with your **most recent blog posts**, ensuring visitors can always see your latest content without manual updates.

---

## ⚙️ How It Works

- Fetches your latest blog posts from one or more RSS feeds.
- Updates the section between:
    ```
    <!-- BLOG-POST-LIST:START -->
    <!-- BLOG-POST-LIST:END -->
    ```
    in your `README.md` file.
- Runs automatically based on a **cron schedule** or can be triggered manually.

---

## 🕒 Trigger Schedule

- By default, it can run every **5 minutes** (configurable via `cron` expression).
- Manual trigger option is also available.

---

## 🔧 Configuration Options

| Parameter | Description | Example |
|---|---|---|
| `feed_list` | Comma-separated list of RSS feed URLs | `https://medium.com/feed/@darshanx106` |
| `max_post_count` | Number of posts to show in your profile | `5` |
| `template` (optional) | Custom display format for each post | `- [{{title}}]({{link}})` |

---

## 🚀 How to Use

1. Create a new file called `blog-post-workflow.yml` inside `.github/workflows/` directory of your **GitHub profile repository** (the repository name should match your GitHub username — `username/username`).

2. Edit your `README.md` file in the root of your repository and add the following placeholder wherever you want the blog posts to appear:

    ```md
    ## 📚 Latest Blog Posts
    <!-- BLOG-POST-LIST:START -->
    <!-- BLOG-POST-LIST:END -->
    ```

3. Commit and push both files to your GitHub repository.

4. GitHub Actions will automatically fetch the latest blog posts from your configured RSS feed and update your `README.md` file.

5. Optionally, you can trigger the workflow manually from the **Actions** tab of your repository.

---

## ✅ Supported Platforms

This workflow supports any platform that provides an **RSS feed**, including but not limited to:

- 📝 **Medium**
- 🌐 **Hashnode**
- 🗒️ **Dev.to**
- 📘 **WordPress**
- 📰 **Substack**
- 🖋️ **Blogger**
- 📄 **Ghost**

If your blogging platform offers an RSS feed, you can use it with this action.

---

## 🔗 Reference

- 📖 Official GitHub Action: [gautamkrishnar/blog-post-workflow](https://github.com/gautamkrishnar/blog-post-workflow)
- 💻 GitHub Actions Documentation: [https://docs.github.com/en/actions](https://docs.github.com/en/actions)
