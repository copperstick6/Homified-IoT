import os
from flask import Flask, send_from_directory, render_template, request
import validators
import requests
app = Flask(__name__)
get_requests = []
post_requests = []

@app.route('/addNewGet', methods=['POST'])
def add_new_get():
    link = str(request.form.get('link'))
    if validators.url(link) == False:
        return "invalid url"
    get_requests += link
    return "success"

@app.route('/addNewPost', methods=['POST'])
def add_new_post():
    link = str(request.form.get('link'))
    if validators.url(link) == False:
        return "invalid url"
    payload += str(request.form.get('payload'))
    if payload == None:
        post_requests += [link, json.loads("{}")]
        return "success"
    try:
        jsonified_payload = json.loads(payload)
        post_requests += [link, payload]
        return "success"
    except:
        return "invalid payload"

@app.route('/send_request', methods=['GET'])
def send_request():
    errors = 0
    for i in get_requests:
        try:
            requests.get(i)
        except:
            errors += 1
    for j in post_requests:
        try:
            requests.post(j[0], data=j[1])
        except:
            errors+=1
    return "Total request errors: " + errors



if __name__ == '__main__':
	app.run(host='0.0.0.0')
