from services.watson import generate_questions

result = generate_questions(
    "Yashraj",
    "Python Developer",
    "Fresher",
    "Technical"
)

print(result)