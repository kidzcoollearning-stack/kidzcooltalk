const form = document.querySelector("#assessment-form");

if (form) {
  const status = form.querySelector(".form-status");
  const button = form.querySelector(".form-submit");
  const submitText = form.querySelector("[data-submit-text]");
  const submitIcon = form.querySelector("[data-submit-icon]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const config = window.KIDZCOOLTALK_CONFIG || {};
    const supabaseUrl = String(config.supabaseUrl || "").replace(/\/+$/, "");
    const supabaseAnonKey = String(config.supabaseAnonKey || "");
    const payload = Object.fromEntries(new FormData(form).entries());

    if (!supabaseUrl || !supabaseAnonKey) {
      submitText.textContent = "预约资料已填写";
      submitIcon.textContent = "✓";
      status.textContent = "连接 Supabase 后即可接收预约。";
      return;
    }

    button.disabled = true;
    submitText.textContent = "正在提交";
    submitIcon.textContent = "…";
    status.textContent = "";

    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/assessment_requests`,
        {
          method: "POST",
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      form.reset();
      submitText.textContent = "预约资料已提交";
      submitIcon.textContent = "✓";
      status.textContent = "谢谢，我们已收到你的资料。";
    } catch {
      submitText.textContent = "提交评估预约";
      submitIcon.textContent = "→";
      status.textContent = "暂时无法提交，请稍后再试。";
    } finally {
      button.disabled = false;
    }
  });
}
