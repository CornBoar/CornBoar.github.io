import fastapi
from fastapi.middleware.cors import CORSMiddleware
import json
import geometrydash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import string
import requests

app = fastapi.FastAPI()

origins = ['*']

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

@app.get('/')
async def root():
    return 'Docs are at https://cornboar.com/api/.'

@app.get('/stand/{user_id}/')
async def get_stand(user_id):
    with open(r'C:\Users\Dani1\Documents\YBABOTSTANDSAVES.json', 'r+') as f:
        standSaveData = json.load(f)
    return {str(user_id): standSaveData[user_id]}

@app.get('/stands/{user_id}/')
async def get_stands(user_id):
    with open(r'C:\Users\Dani1\Documents\YBABOTSTANDSAVES.json', 'r+') as f:
        standSaveData = json.load(f)
    with open(r'C:\Users\Dani1\Documents\YBABOTSLOT1SAVES.json', 'r+') as f:
        slot1SaveData = json.load(f)
    with open(r'C:\Users\Dani1\Documents\YBABOTSLOT2SAVES.json', 'r+') as f:
        slot2SaveData = json.load(f)
    with open(r'C:\Users\Dani1\Documents\YBABOTSLOT3SAVES.json', 'r+') as f:
        slot3SaveData = json.load(f)
    with open(r'C:\Users\Dani1\Documents\YBABOTSLOT4SAVES.json', 'r+') as f:
        slot4SaveData = json.load(f)
    with open(r'C:\Users\Dani1\Documents\YBABOTSLOT5SAVES.json', 'r+') as f:
        slot5SaveData = json.load(f)
    # ignore this awful garbage 😭
    return {'equipped': standSaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>', ', H21').replace('<:Christmas2022:1082055926271459348>',
    ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>', 'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L'), 'slot_1': slot1SaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>',
    ', H21').replace('<:Christmas2022:1082055926271459348>', ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>',
    'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L'), 'slot_2': slot2SaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>',
    ', H21').replace('<:Christmas2022:1082055926271459348>',
    ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>', 'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L'), 'slot_3': slot3SaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>',
    ', H21').replace('<:Christmas2022:1082055926271459348>',
    ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>', 'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L'), 'slot_4': slot4SaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>',
    ', H21').replace('<:Christmas2022:1082055926271459348>',
    ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>', 'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L'), 'slot_5': slot5SaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>',
    ', H21').replace('<:Christmas2022:1082055926271459348>',
    ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>', 'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L')}

@app.get('/items/{user_id}/')
async def get_items(user_id):
    with open(r'C:\Users\Dani1\Documents\YBABOTITEMINVENTORYSAVES.json', 'r+') as f:
        itemInventorySaveData = json.load(f)
    return {'Mysterious Arrow': itemInventorySaveData[user_id]['Mysterious Arrow'], 'Rokakaka': itemInventorySaveData[user_id]['Rokakaka'], "Rib Cage of the Saint's Corpse": itemInventorySaveData[user_id]["Rib Cage of the Saint's Corpse"],
            'Lucky Arrow': itemInventorySaveData[user_id]['Lucky Arrow']}

@app.get('/pity/{user_id}/')
async def get_pity(user_id):
    with open(r'C:\Users\Dani1\Documents\YBABOTPITYSAVES.json', 'r+') as f:
        pitySaveData = json.load(f)
    return {str(user_id): pitySaveData[user_id]}

@app.get('/username/{user_id}/')
async def get_username(user_id):
    with open(r'C:\Users\Dani1\Documents\YBABOTUSERINFOSAVES.json', 'r+') as f:
        userInfoSaveData = json.load(f)
    return {str(user_id): userInfoSaveData[user_id] if not userInfoSaveData[user_id].endswith('0') else userInfoSaveData[user_id][:-2]}

@app.get('/is_admin/{user_id}/')
async def get_admin_status(user_id):
    return {str(user_id): True if str(user_id) in ['991443322516279466', '707502360783487007', '933413272672170054', '738726638539505694', '980510041864040548'] else False}

@app.get('/dlvlist/')
async def get_dlv_list():
    with open(r'C:\Users\Dani1\DLVLIST.json', 'r+') as f:
        dlv_list = json.load(f)
    with open(r'C:\Users\Dani1\DLVGDSTATS.json', 'r+') as f:
        dlv_gd_stats = json.load(f)
    with open(r'C:\Users\Dani1\DLVPOINTS.json', 'r+') as f:
        dlv_points = json.load(f)
    dlv_list_points = {}
    if not all([True if i in list(dlv_gd_stats.keys()) else False for i in dlv_list['main']]):
        for i in dlv_list['main']:
            level = await geometrydash.search_level(i, 1)
            level = level[0]
            if level.author is None:
                class author:
                    def __init__(self):
                        self.name = '-'
                level.author = author()
            dlv_gd_stats[i] = {'author': level.author.name, 'difficulty': level.difficulty, 'downloads': level.downloads, 'likes': level.likes, 'length': level.length, 'objectCount': level.objects, 'gameVersion': level.gameVersion,
                               'song': level.songName,
                               'levelId': str(level.id)}
            dlv_list_points[i] = dlv_points[i.lower()]
            open(r'C:\Users\Dani1\DLVGDSTATS.json', 'r+').truncate()
            json.dump(dlv_gd_stats, open(r'C:\Users\Dani1\DLVGDSTATS.json', 'r+'))
    dlv_list['gd_stats'] = dlv_gd_stats
    dlv_list['points'] = dlv_list_points
    return dlv_list

@app.get('/dlvusers/')
async def get_dlv_users():
    with open(r'C:\Users\Dani1\DLVUSERS.json', 'r+') as f:
        dlv_users = json.load(f)
    with open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+') as f:
        dlv_saves = json.load(f)
    for i in dlv_users:
        xp = dlv_saves[i]['xp']
        dlv_users[i].update({'xp': xp})
    sorted_dlv_users = {x[0]: x[1] for x in sorted(dlv_users.items(), key=lambda x: x[1]['xp'], reverse=True)}
    return sorted_dlv_users

@app.get('/dlvusers/{user_id}/')
async def get_dlv_user(user_id):
    with open(r'C:\Users\Dani1\DLVUSERS.json', 'r+') as f:
        dlv_users = json.load(f)
    return dlv_users[str(user_id)]

@app.get('/dlvuserstop100/')
async def get_dlv_users_top100():
    with open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+') as f:
        dlv_saves = json.load(f)
    sorted_saves = list(sorted(dlv_saves.items(), key=lambda x: x[1]['xp'], reverse=True))
    return {'main': sorted_saves[:99]}

@app.get('/dlvvalidatekey/{key}/')
async def dlv_validate_key(key):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)
    if key == dlv_keys['main']:
        return {'main': True}
    else:
        return {'main': False}

@app.get('/dlvadddemon/{key}/{position}/{name}/{color}/')
async def dlv_add_demon(key, position, name, color):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)  # )))
    if key == dlv_keys['main']:
        try:
            with open(r'C:\Users\Dani1\DLVLIST.json', 'r+') as f:
                dlv_list = json.load(f)
            dlv_list['main'].insert(len(dlv_list['main']) - (int(position) - 1), name.title())
            dlv_list['colors'][name.title()] = f'#{color}'
            open(r'C:\Users\Dani1\DLVLIST.json', 'r+').truncate()
            json.dump(dlv_list, open(r'C:\Users\Dani1\DLVLIST.json', 'r+'))
            return {'main': 'success'}
        except Exception as error:
            return {'main': error}
    else:
        return {'main': 'invalid key'}

@app.get('/dlvremovedemon/{key}/{name}/')
async def dlv_remove_demon(key, name):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)
    if key == dlv_keys['main']:
        name = name.title()
        try:
            with open(r'C:\Users\Dani1\DLVLIST.json', 'r+') as f:
                dlv_list = json.load(f)
            new_list = []
            for i in dlv_list['main']:
                if i != name:
                    new_list.append(i)
            dlv_list['main'] = new_list
            open(r'C:\Users\Dani1\DLVLIST.json', 'r+').truncate()
            json.dump(dlv_list, open(r'C:\Users\Dani1\DLVLIST.json', 'r+'))
            return {'main': 'success'}
        except Exception as error:
            return {'main': error}
    else:
        return {'main': 'invalid key'}

@app.get('/dlvaddcompletion/{key}/{user_id}/{demon_name}/')
async def dlv_add_completion(key, user_id, demon_name):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)
    if key == dlv_keys['main']:
        try:
            with open(r'C:\Users\Dani1\DLVUSERS.json', 'r+') as f:
                dlv_users = json.load(f)
            dlv_users[user_id]['completions'].append(demon_name)
            open(r'C:\Users\Dani1\DLVUSERS.json', 'r+').truncate()
            json.dump(dlv_users, open(r'C:\Users\Dani1\DLVUSERS.json', 'r+'))
            return {'main': 'success'}
        except Exception as error:
            return {'main': error}
    else:
        return {'main': 'invalid key'}

@app.get('/dlvremovecompletion/{key}/{user_id}/{demon_name}/')
async def dlv_remove_completion(key, user_id, demon_name):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)
    if key == dlv_keys['main']:
        try:
            with open(r'C:\Users\Dani1\DLVUSERS.json', 'r+') as f:
                dlv_users = json.load(f)
            dlv_users[user_id]['completions'].remove(demon_name)
            open(r'C:\Users\Dani1\DLVUSERS.json', 'r+').truncate()
            json.dump(dlv_users, open(r'C:\Users\Dani1\DLVUSERS.json', 'r+'))
            return {'main': 'success'}
        except Exception as error:
            return {'main': error}
    else:
        return {'main': 'invalid key'}

@app.get('/dlvsetxp/{key}/{user_id}/{xp_amount}/')
async def dlv_remove_completion(key, user_id, xp_amount):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)
    if key == dlv_keys['main']:
        try:
            with open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+') as f:
                dlv_bot_xp_saves = json.load(f)
            dlv_bot_xp_saves[user_id]['xp'] = int(xp_amount)
            open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+').truncate()
            json.dump(dlv_bot_xp_saves, open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+'))
            return {'main': 'success'}
        except Exception as error:
            return {'main': error}
    else:
        return {'main': 'invalid key'}

@app.get('/dlvsignup/{email}/{password}/')
async def dlv_sign_up(email, password):
    try:
        with open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+') as f:
            dlv_accounts = json.load(f)
        if email in list(dlv_accounts.keys()):
            return {'main': 'Email Already In Use'}
        verification_code = ''
        for _ in range(5):
            verification_code += random.choice(string.ascii_letters + '0123456789')
        msg = MIMEMultipart()
        msg['From'] = 'dlvverification@outlook.com'
        msg['To'] = email
        msg['Subject'] = 'Verify Demon List Verifications Account'
        msg.attach(MIMEText(f'Your email was used to sign up for a Demon List Verifications account. Go to https://cornboar.com/dlv/verify/ and enter your email, password, and this verification '
                            f'code: {verification_code}. If you did not sign up for a Demon List Verifications account you can ignore this email.', 'plain'))
        server = smtplib.SMTP('smtp.office365.com', 587)
        server.starttls()
        server.login('dlvverification@outlook.com', '')
        server.sendmail('dlvverification@outlook.com', email, msg.as_string())
        server.quit()
        dlv_accounts[email] = {'email': email, 'password': password, 'verified': False, 'discord_account_id': None, 'verification_code': verification_code, 'otp': None}
        open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+').truncate()
        json.dump(dlv_accounts, open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+'))
        return {'main': 'Account Successfully Created, Check Your Email For Verification Instructions.'}
    except Exception as error:
        print(error)
        return {'main': 'Error'}

@app.get('/dlvverifyaccount/{email}/{password}/{verification_code}/')
async def dlv_verify_account(email, password, verification_code):
    try:
        with open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+') as f:
            dlv_accounts = json.load(f)
        if dlv_accounts[email]['verified']:
            return {'email': 'This Account Is Already Verified'}
        if verification_code == dlv_accounts[email]['verification_code'] and password == dlv_accounts[email]['password']:
            dlv_accounts[email]['verification_code'] = None
            dlv_accounts[email]['verified'] = True
            open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+').truncate()
            json.dump(dlv_accounts, open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+'))
            return {'main': 'Successfully Verified Your DLV Account! You Can Log In Now.'}
        else:
            return {'main': 'Invalid Verification Code/Password'}
    except Exception as error:
        print(error)
        return {'main': 'Error'}

@app.get('/dlvlogin/{email}/{password}/')
async def dlv_login(email, password):
    try:
        with open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+') as f:
            dlv_accounts = json.load(f)
        if email not in list(dlv_accounts.keys()):
            return {'main': 'Email Is Not Registered'}
        if not dlv_accounts[email]['verified']:
            return {'main': 'This Account has Not Been Verified Yet'}
        if dlv_accounts[email]['password'] == password or dlv_accounts[email]['otp'] == password:
            dlv_accounts[email]['otp'] = None
            open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+').truncate()
            json.dump(dlv_accounts, open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+'))
            return {'main': 'Success', 'data': dlv_accounts[email]}
        else:
            return {'main': 'Incorrect Password'}
    except Exception as error:
        print(error)
        return {'main': 'Error'}

@app.get('/dlvgetaccount/{email}/{password}/')
async def dlv_get_account(email, password):
    try:
        with open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+') as f:
            dlv_accounts = json.load(f)
        if email in list(dlv_accounts.keys()):
            if password == dlv_accounts[email]['password'] or password == dlv_accounts[email]['otp']:
                if dlv_accounts[email]['verified']:
                    if not dlv_accounts[email]['discord_account_id']:
                        return {'email': dlv_accounts[email]['email'], 'password': dlv_accounts[email]['password'], 'discord_account_id': dlv_accounts[email]['discord_account_id'], 'otp': dlv_accounts[email]['otp']}
                    else:
                        with open(r'C:\Users\Dani1\DLVUSERS.json', 'r+') as f:
                            dlv_users = json.load(f)
                        with open(r'C:\Users\Dani1\DLVLIST.json', 'r+') as f:
                            dlv_list = json.load(f)
                        completions_0 = dlv_users[dlv_accounts[email]['discord_account_id']]['completions']
                        colors = [dlv_list['colors'][i] for i in completions_0]
                        completions = zip(completions_0, colors)
                        with open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+') as f:
                            dlv_saves = json.load(f)
                        sorted_saves = list(sorted(dlv_saves.items(), key=lambda x: x[1]['xp'], reverse=True))
                        rank = 0
                        for i in sorted_saves:
                            if i[1]['user_id'] == dlv_accounts[email]['discord_account_id']:
                                rank = sorted_saves.index(i) + 1
                        with open(r'C:\Users\Dani1\DLVDEMONVFVS.json', 'r+') as f:
                            dlv_demon_vfvs = json.load(f)
                        verifications = []
                        first_victors = []
                        for i in dlv_list['main']:
                            try:
                                if dlv_demon_vfvs[i]['verifier']['user_id'] == str(dlv_accounts[email]['discord_account_id']):
                                    verifications.append(i)
                            except Exception as error:
                                print(error)
                        for e in dlv_list['main']:
                            try:
                                if dlv_demon_vfvs[e]['first_victor']['user_id'] == str(dlv_accounts[email]['discord_account_id']):
                                    first_victors.append(e)
                            except Exception as error:
                                print(error)
                        return {'email': dlv_accounts[email]['email'], 'password': dlv_accounts[email]['password'], 'discord_account_id': dlv_accounts[email]['discord_account_id'],
                                'discord_username': dlv_users[dlv_accounts[email]['discord_account_id']]['username'], 'completions': completions, 'verifications': verifications, 'first_victors': first_victors,
                                'xp': dlv_saves[dlv_accounts[email]['discord_account_id']]['xp'], 'rank': rank, 'avatar': dlv_users[dlv_accounts[email]['discord_account_id']]['avatar'], 'otp': dlv_accounts[email]['otp']}
                else:
                    return {'main': 'Account Is Not Verified'}
            else:
                return {'main': 'Invalid Password'}
        else:
            return {'main': 'Invalid Email'}
    except Exception as error:
        print(error)
        return {'main': 'error'}

@app.get('/dlvsendotp/{email}/')
async def dlv_send_otp(email):
    try:
        with open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+') as f:
            dlv_accounts = json.load(f)
        if email in list(dlv_accounts.keys()):
            otp = ''
            for _ in range(5):
                otp += random.choice(string.ascii_letters + '0123456789')
            msg = MIMEMultipart()
            msg['From'] = 'dlvverification@outlook.com'
            msg['To'] = email
            msg['Subject'] = 'Verify Demon List Verifications Account'
            dlv_accounts[email]['otp'] = otp
            open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+').truncate()
            json.dump(dlv_accounts, open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+'))
            msg.attach(MIMEText(f'DO NOT SHARE THIS WITH ANYONE!!! 😱\n\n'
                                f'Here is your DLV one time password: {otp}\n\nUse this to log in and change your password from settings, it will be valid until your next login or until you generate a new one.\n\nIf you '
                                f'did not request a one time password '
                                f'you can ignore '
                                f'this email.', 'plain'))
            server = smtplib.SMTP('smtp.office365.com', 587)
            server.starttls()
            server.login('dlvverification@outlook.com', '')
            server.sendmail('dlvverification@outlook.com', email, msg.as_string())
            server.quit()
            return {'main': f'Successfully sent a one time password to {email}!'}
        else:
            return {'main': 'That email address does not have a DLV Account connected to it!'}
    except Exception as error:
        print(error)
        return {'main': 'Error'}

@app.get('/dlvchangepassword/{email}/{old_password}/{new_password}/')
async def dlv_change_password(email, old_password, new_password):
    try:
        with open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+') as f:
            dlv_accounts = json.load(f)
        if email in list(dlv_accounts.keys()):
            if dlv_accounts[email]['password'] == old_password:
                dlv_accounts[email]['password'] = new_password
                open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+').truncate()
                json.dump(dlv_accounts, open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r+'))
                return {'main': 'Successfully Changed Your Password!'}
            else:
                assert 1 == 2
        else:
            assert 1 == 2
    except Exception as error:
        print(error)
        return {'main': 'An Error Occured'}

@app.get('/dlvsaveroulette/{email}/{password}/{roulette_json}/')
async def dlv_save_roulette(email, password, roulette_json):
    pass

@app.get('/getwebsource/{url}/')
async def get_web_source(url):
    url = str(url).replace('!', '/')
    return {'main': requests.get(url).text}
