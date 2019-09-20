json.content @chat.content
json.image @chat.image.url
json.created_at @chat.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @chat.user.name
json.id @chat.id