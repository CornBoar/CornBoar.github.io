import discord
from discord import app_commands
import json
import random
import string
import gd
import geometrydash as gda
import requests
import typing
import asyncio
import requests
import base64
import json
import secrets
import datetime
from urllib.parse import urlparse, parse_qs
from contextlib import suppress

def get_yt_id(url, ignore_playlist=True):
    query = urlparse(url)
    if query.hostname == 'youtu.be':
        return query.path[1:]
    if query.hostname in {'www.youtube.com', 'youtube.com', 'music.youtube.com'}:
        if not ignore_playlist:
            with suppress(KeyError):
                return parse_qs(query.query)['list'][0]
        if query.path == '/watch':
            return parse_qs(query.query)['v'][0]
        if query.path[:7] == '/watch/':
            return query.path.split('/')[2]
        if query.path[:7] == '/embed/':
            return query.path.split('/')[2]
        if query.path[:3] == '/v/':
            return query.path.split('/')[2]

aredl_data_full = requests.get('https://api.aredl.net/api/aredl/levels/').json()
new_aredl_data_full = {}
for i in aredl_data_full:
    try:
        if not i['legacy'] is True:
            new_aredl_data_full[i['name']] = i
    except:
        new_aredl_data_full[i['name']] = i
aredl_data_full = new_aredl_data_full
aredl_all_demons = []
for i in list(aredl_data_full.keys()):
    aredl_all_demons.append(i.lower())

gd = gd.Client()

with open(r'C:\Users\Dani1\DLVWARNSAVES.json', 'r') as f:
    dlv_warn_saves = json.load(f)

with open(r'C:\Users\Dani1\DLVLOGINKEYS.json', 'r') as f:
    dlv_login_keys = json.load(f)

try:
    with open(r'C:\Users\Dani1\DLVLIST.json', 'r') as f:
        dlv_list = json.load(f)
except:
    dlv_list = requests.get('https://cornboar.com/api/dlvlist.json').json()

try:
    with open(r'C:\Users\Dani1\DLVUSERS.json', 'r') as f:
        dlv_users = json.load(f)
except:
    dlv_list = requests.get('https://cornboar.com/api/dlvlist.json').json()

with open(r'C:\Users\Dani1\DLVKEYS.json', 'r') as f:
    dlv_keys = json.load(f)

with open(r'C:\Users\Dani1\Documents\DLVACCOUNTS.json', 'r') as f:
    dlv_accounts = json.load(f)

with open(r'C:\Users\Dani1\DLVNAMETOID.json', 'r') as f:
    dlv_name_to_id = json.load(f)

with open(r'C:\Users\Dani1\DLVRECORDSAVES.json', 'r') as f:
    dlv_records = json.load(f)

with open(r'C:\Users\Dani1\DLVMONTHLYDEMONS.json', 'r') as f:
    dlv_monthly_demons = json.load(f)

try:
    with open(r'C:\Users\Dani1\DLVPACKS.json', 'r') as f:
        dlv_packs = json.load(f)
except:
    dlv_list = requests.get('https://cornboar.com/api/dlvlist.json').json()

try:
    with open(r'C:\Users\Dani1\Documents\DLVAREDLVIDEOS.json', 'r') as f:
        dlv_aredl_videos = json.load(f)
except:
    dlv_aredl_videos = dlv_list['videos']

with open(r'C:\Users\Dani1\DLVLEFTMEMBERS.json', 'r') as f:
    dlv_left_members = json.load(f)

def save():
    json.dump(dlv_list, open(r'C:\Users\Dani1\DLVLIST.json', 'w'))
    json.dump(dlv_users, open(r'C:\Users\Dani1\DLVUSERS.json', 'w'))
    json.dump(dlv_keys, open(r'C:\Users\Dani1\DLVKEYS.json', 'w'))
    json.dump(dlv_accounts, open(r'C:\Users\Dani1\Documents/DLVACCOUNTS.json', 'w'))
    json.dump(dlv_name_to_id, open(r'C:\Users\Dani1\DLVNAMETOID.json', 'w'))
    json.dump(dlv_records, open(r'C:\Users\Dani1\DLVRECORDSAVES.json', 'w'))
    json.dump(dlv_monthly_demons, open(r'C:\Users\Dani1\DLVMONTHLYDEMONS.json', 'w'))
    json.dump(dlv_packs, open(r'C:\Users\Dani1\DLVPACKS.json', 'w'))
    json.dump(dlv_aredl_videos, open(r'C:\Users\Dani1\Documents\DLVAREDLVIDEOS.json', 'w'))
    json.dump(dlv_left_members, open(r'C:\Users\Dani1\DLVLEFTMEMBERS.json', 'w'))
    json.dump(dlv_login_keys, open(r'C:\Users\Dani1\DLVLOGINKEYS.json', 'w'))
    json.dump(dlv_warn_saves, open(r'C:\Users\Dani1\DLVWARNSAVES.json', 'w'))

for i in list(aredl_data_full.values()):
    if list(aredl_data_full.keys()) == list(dlv_aredl_videos.keys()):
        break
    if i['name'] not in list(dlv_aredl_videos.keys()):
        video_url = requests.get(f'https://api.aredl.net/api/aredl/levels/{i["id"]}?verification=1').json()['verification']['video_url']
        aredl_data_full[i['name']]['video'] = video_url
        dlv_aredl_videos[i['name']] = video_url
        print('Requested For', i['name'])
    else:
        aredl_data_full[i['name']]['video'] = dlv_aredl_videos[i['name']]
    save()

def get_user_id(username):
    for i, e in list(dlv_users.items()):
        if e['username'] == username:
            return i
    print(username, 'black men')
    return None

def hex_to_rgb(hex_code):
    return tuple(int(hex_code[i:i + 2], 16) for i in (0, 2, 4))

client = discord.Client(intents=discord.Intents.all())
tree = app_commands.CommandTree(client=client)

admin_ids = ['991443322516279466', '863876735031836702', '895007949678845972', '704221400256348245', '1219221392608985092', '1154977628743274578', '543885678258290699']

updated = 0

@client.event
async def on_message(message):
    global updated
    updated += 1
    if message.content == '!hello':
        await message.channel.send('hallo i am the dlv bot')
    if message.content.lower().__contains__('nigga') or message.content.lower().__contains__('nigger'):
        await message.delete()
    if str(message.channel.id) == '1255647172016472236' and str(message.content) != 'fodso: i like hotdog':
        await message.delete()
    if str(message.channel.id) == '1249167048672546818' and str(message.author.id) != '1130983552230621245':
        await message.delete()
    if updated == 10:
        dlv_packs[list(dlv_packs.values())[0]['name']]['list'] = dlv_list['main']
        for i in list(dlv_packs.values()):
            if not i['levels'] == []:
                levels_to_points = {}
                for e in i['levels']:
                    levels_to_points[e] = aredl_data_full[dlv_list['og_case'][e]]['points']
                sorted_levels = list(sorted(levels_to_points.items(), key=lambda x: x[1], reverse=True))
                sorted_levels = {x[0]: x[1] for x in sorted_levels}
                sorted_levels = list(sorted_levels.keys())
                dlv_packs[i['name']]['levels'] = sorted_levels
                dlv_packs[i['name']]['color'] = dlv_list['colors'][sorted_levels[0]]
                xp_total = 0
                for y in list(levels_to_points.items()):
                    if 75 < aredl_data_full[dlv_list['og_case'][y[0]]]['position'] < 151:
                        xp_total += y[1] * 1.1
                    if aredl_data_full[dlv_list['og_case'][y[0]]]['position'] < 76:
                        xp_total += y[1] * 1.25
                    else:
                        xp_total += y[1]
                dlv_packs[i['name']]['xp_value'] = xp_total / 2
                save()
        content = json.dumps(dlv_list)
        encoded_content = base64.b64encode(content.encode()).decode()
        url = f'https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvlist.json'
        headers = {
            'Authorization': f'token {secrets.GITHUB_TOKEN}',
            'Accept': 'application/vnd.github.v3+json'
        }
        response = requests.get(url, headers=headers)
        response_data = response.json()
        file_sha = response_data['sha']
        data = {
            'message': 'Database Update',
            'content': encoded_content,
            'sha': file_sha,
            'branch': 'main'
        }
        requests.put(url, headers=headers, data=json.dumps(data))
        sorted_users = list(sorted(dlv_users.items(), key=lambda x: x[1]['xp'], reverse=True))
        sorted_users = {x[0]: x[1] for x in sorted_users}
        content = json.dumps(sorted_users)
        encoded_content = base64.b64encode(content.encode()).decode()
        url = f'https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvusers.json'
        headers = {
            'Authorization': f'token {secrets.GITHUB_TOKEN}',
            'Accept': 'application/vnd.github.v3+json'
        }
        response = requests.get(url, headers=headers)
        response_data = response.json()
        file_sha = response_data['sha']
        data = {
            'message': 'Database Update',
            'content': encoded_content,
            'sha': file_sha,
            'branch': 'main'
        }
        requests.put(url, headers=headers, data=json.dumps(data))
        sorted_packs = list(sorted(dlv_packs.items(), key=lambda x: x[1]['xp_value'], reverse=True))
        sorted_packs = {x[0]: x[1] for x in sorted_packs}
        content = json.dumps(sorted_packs)
        encoded_content = base64.b64encode(content.encode()).decode()
        url = f'https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvpacks.json'
        headers = {
            'Authorization': f'token {secrets.GITHUB_TOKEN}',
            'Accept': 'application/vnd.github.v3+json'
        }
        response = requests.get(url, headers=headers)
        response_data = response.json()
        file_sha = response_data['sha']
        data = {
            'message': 'Database Update',
            'content': encoded_content,
            'sha': file_sha,
            'branch': 'main'
        }
        requests.put(url, headers=headers, data=json.dumps(data))
        for i in dlv_list['main']:
            dlv_list['aredl_positions'][i] = aredl_data_full[dlv_list['og_case'][i]]['position']
            dlv_list['videos'][i] = dlv_aredl_videos[dlv_list['og_case'][i]]
            try:
                dlv_list['level_stats'][i]['object_count'] = str('{:,}'.format(int(dlv_list['level_stats'][i]['object_count'])))
            except Exception as error:
                pass
        for i in dlv_list['main']:
            if i not in list(dlv_list['thumbnails'].keys()):
                if requests.get('https://img.youtube.com/vi/' + get_yt_id(dlv_list['videos'][i]) + '/maxresdefault.jpg').status_code == 200:
                    dlv_list['thumbnails'][i] = {'url': 'https://img.youtube.com/vi/' + get_yt_id(dlv_list['videos'][i]) + '/maxresdefault.jpg', 'type': 'maxres'}
                else:
                    dlv_list['thumbnails'][i] = {'url': 'https://img.youtube.com/vi/' + get_yt_id(dlv_list['videos'][i]) + '/hqdefault.jpg', 'type': 'hq'}
        victors_dict = {}
        for i in dlv_list['main']:
            packs = []
            for b in list(dlv_packs.values()):
                if i in b['levels']:
                    packs.append(b['name'])
            dlv_list['packs'][i] = packs
            xp_amount = float(aredl_data_full[dlv_list['og_case'][i]]['points'])
            if 75 < int(aredl_data_full[dlv_list['og_case'][i]]['position']) < 151:
                xp_amount = xp_amount * 1.1
            if int(aredl_data_full[dlv_list['og_case'][i]]['position']) < 76:
                xp_amount = xp_amount * 1.25
            dlv_list['xp_values'][i] = xp_amount
            victors = []
            for e in list(dlv_users.values()):
                if e['user_id'] not in dlv_warn_saves:
                    dlv_warn_saves[e['user_id']] = []
                if i in e['completions']['main']:
                    victors.append([e['user_id'], e['username']])
            victors_dict[i] = victors
        dlv_list['victors'] = victors_dict
        list_dict = {}
        for i in list(dlv_packs.values()):
            dlv_packs[i['name']]['victors'] = []
        for i in list(dlv_users.values()):
            try:
                i['avatar_url'] = str(client.get_guild(1245200525037932565).get_member(int(i['user_id'])).avatar.url)
            except:
                pass
            if 'monthly_demons' not in list(i['completions'].keys()):
                dlv_users[i['user_id']]['completions']['monthly_demons'] = []
            if 'packs' not in list(i['completions'].keys()):
                dlv_users[i['user_id']]['completions']['packs'] = []
            verifications = []
            for e in i['completions']['main']:
                if dlv_list['verifiers'][e][0] == i['user_id']:
                    verifications.append(e)
            dlv_users[i['user_id']]['completions']['verifications'] = verifications
            completed_packs = []
            for z in list(dlv_packs.values()):
                completed_level_count = 0
                for y in z['levels']:
                    if y in i['completions']['main']:
                        completed_level_count += 1
                if completed_level_count == len(z['levels']):
                    completed_packs.append(z['name'])
                    dlv_packs[z['name']]['victors'].append([i['user_id'], i['username']])
            for b in completed_packs:
                if b not in list(dlv_packs.keys()):
                    completed_packs.remove(b)
            dlv_users[i['user_id']]['completions']['packs'] = completed_packs
        save()
        for e in dlv_list['main']:
            list_dict[e] = list(aredl_data_full.keys()).index(dlv_list['og_case'][e])
        sorted_list = list(sorted(list_dict.items(), key=lambda x: x[1], reverse=False))
        final_list = [y[0] for y in sorted_list]
        dlv_list['main'] = final_list
        save()
        for i in list(dlv_users.values()):
            if i['xp'] < 100:
                if i['xp'] < 25:
                    if i['xp'] != 0:
                        await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(1261051046588055555))
                elif i['xp'] < 50:
                    await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(1261051133288382475))
                elif i['xp'] < 75:
                    await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(1261051315841138760))
                else:
                    await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(1261051454429466674))
            completions_dict = {}
            for e in i['completions']['main']:
                if e in dlv_list['main']:
                    completions_dict[e] = dlv_list['main'].index(e)
            sorted_completions = list(sorted(completions_dict.items(), key=lambda x: x[1], reverse=False))
            final_completions = [y[0] for y in sorted_completions]
            dlv_users[i['user_id']]['completions']['main'] = final_completions
            completions_dict = {}
            for e in i['completions']['verifications']:
                if e in dlv_list['main']:
                    completions_dict[e] = dlv_list['main'].index(e)
            sorted_completions = list(sorted(completions_dict.items(), key=lambda x: x[1], reverse=False))
            final_completions = [y[0] for y in sorted_completions]
            dlv_users[i['user_id']]['completions']['verifications'] = final_completions
            completions_dict = {}
            for e in i['completions']['first_victors']:
                if e in dlv_list['main']:
                    completions_dict[e] = dlv_list['main'].index(e)
            sorted_completions = list(sorted(completions_dict.items(), key=lambda x: x[1], reverse=False))
            final_completions = [y[0] for y in sorted_completions]
            dlv_users[i['user_id']]['completions']['first_victors'] = final_completions
            xp_sum = 0
            for y in i['completions']['main']:
                xp_amount = float(aredl_data_full[dlv_list['og_case'][y]]['points'])
                if 75 < int(aredl_data_full[dlv_list['og_case'][y]]['position']) < 151:
                    xp_amount = xp_amount * 1.1
                if int(aredl_data_full[dlv_list['og_case'][y]]['position']) < 76:
                    xp_amount = xp_amount * 1.25
                if y in i['completions']['monthly_demons']:
                    xp_amount = xp_amount * 1.5
                xp_sum += xp_amount
            for c in i['completions']['packs']:
                xp_sum += dlv_packs[c]['xp_value']
            dlv_users[i['user_id']]['xp'] = xp_sum
            dlv_users[list(dlv_users.keys())[0]]['colors'] = dlv_list['colors']
            dlv_users[list(dlv_users.keys())[0]]['og_case'] = dlv_list['og_case']
            dlv_packs[list(dlv_packs.keys())[0]]['colors'] = dlv_list['colors']
            dlv_packs[list(dlv_packs.keys())[0]]['og_case'] = dlv_list['og_case']
            sorted_users = list(sorted(dlv_users.items(), key=lambda x: x[1]['xp'], reverse=True))
            sorted_users = {x[0]: x[1] for x in sorted_users}
            top_player = client.get_guild(1245200525037932565).get_member(int(list(sorted_users.values())[0]['user_id']))
            add_top_player_role = True
            for i in top_player.roles:
                if i.id == 1251257182121361530:
                    add_top_player_role = False
                    break
            if add_top_player_role:
                await top_player.add_roles(client.get_guild(1245200525037932565).get_role(1251257182121361530))
            for i in list(dlv_users.values()):
                user_xp = i['xp']
                user_rebirths = 0
                while user_xp > 9999:
                    user_xp = user_xp - 10000
                    user_rebirths += 1
                level = str(user_xp // 100).split('.')[0]
                update_level_role = True
                update_rebirth_role = True
                roman_numerals_dict = {0: '0', 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V'}
                try:
                    users = client.get_guild(1245200525037932565).get_member(int(i['user_id'])).roles
                except:
                    users = []
                for e in users:
                    if str(e.name).__contains__('Level') and not str(e.name) == f'Level {level}':
                        await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).remove_roles(client.get_guild(1245200525037932565).get_role(e.id))
                    if str(e.name) == f'Level {level}':
                        update_level_role = False
                        break
                    if str(e.name).__contains__('Rebirth') and not str(e.name) == f'Rebirth {roman_numerals_dict[user_rebirths]}':
                        await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).remove_roles(client.get_guild(1245200525037932565).get_role(e.id))
                    if str(e.name) == f'Rebirth {roman_numerals_dict[user_rebirths]}':
                        update_rebirth_role = False
                        break
                if update_level_role:
                    for x in client.get_guild(1245200525037932565).roles:
                        if str(x.name) == f'Level {level}':
                            await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(x.id))
                if update_rebirth_role:
                    for x in client.get_guild(1245200525037932565).roles:
                        if str(x.name) == f'Rebirth {roman_numerals_dict[user_rebirths]}':
                            await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(x.id))
            dlv_list['main'] = list(dict.fromkeys(dlv_list['main']))
            for i in list(dlv_users.values()):
                dlv_users[i['user_id']]['completions']['main'] = list(dict.fromkeys(i['completions']['main']))
                dlv_users[i['user_id']]['completions']['verifications'] = list(dict.fromkeys(i['completions']['verifications']))
                dlv_users[i['user_id']]['completions']['first_victors'] = list(dict.fromkeys(i['completions']['first_victors']))
            save()
        for i in message.guild.members:
            if str(i.id) not in list(dlv_users.keys()):
                dlv_users[str(i.id)] = {'username': str(i.name), 'user_id': str(i.id), 'avatar_url': str(i.avatar), 'completions': {'main': [], 'verifications': [], 'first_victors': [], 'monthly_demons': []}, 'xp': 0, 'dlvbucks': 0}
            save()
        print('Updated Stuff')
        updated = 0

@tree.command(name='generateloginkey', description='Generate a key to log in on the website.')
async def generate_login_key(interaction: discord.Interaction):
    key = ''
    for i in range(10):
        key += random.choice(string.ascii_letters + '12345678910')
    dlv_login_keys[str(interaction.user.id)] = f'{str(interaction.user.id)}E{key}'
    save()
    await interaction.response.send_message(embed=discord.Embed(title=f'Your Login Key Is: {str(interaction.user.id)}E{key}', description='It will be valid until you generate a new one.', colour=discord.Colour.blurple()), ephemeral=True)

@tree.command(name='forceupdate', description='Updates all data. Can only be used by admins.')
async def force_update(interaction: discord.Interaction):
    if str(interaction.user.id) in admin_ids:
        dlv_members = client.get_guild(1245200525037932565).members
        id_list = []
        for i in dlv_members:
            id_list.append(str(i.id))
        for i in list(dlv_users.keys()):
            if i not in id_list:
                dlv_left_members[i] = dlv_users[i]
                del dlv_users[i]
                save()
        dlv_packs[list(dlv_packs.values())[0]['name']]['list'] = dlv_list['main']
        for i in list(dlv_packs.values()):
            if not i['levels'] == []:
                levels_to_points = {}
                for e in i['levels']:
                    levels_to_points[e] = aredl_data_full[dlv_list['og_case'][e]]['points']
                sorted_levels = list(sorted(levels_to_points.items(), key=lambda x: x[1], reverse=True))
                sorted_levels = {x[0]: x[1] for x in sorted_levels}
                sorted_levels = list(sorted_levels.keys())
                dlv_packs[i['name']]['levels'] = sorted_levels
                dlv_packs[i['name']]['color'] = dlv_list['colors'][sorted_levels[0]]
                xp_total = 0
                for y in list(levels_to_points.items()):
                    if 75 < aredl_data_full[dlv_list['og_case'][y[0]]]['position'] < 151:
                        xp_total += y[1] * 1.1
                    if aredl_data_full[dlv_list['og_case'][y[0]]]['position'] < 76:
                        xp_total += y[1] * 1.25
                    else:
                        xp_total += y[1]
                dlv_packs[i['name']]['xp_value'] = xp_total / 2
                save()
        content = json.dumps(dlv_list)
        encoded_content = base64.b64encode(content.encode()).decode()
        url = f'https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvlist.json'
        headers = {
            'Authorization': f'token {secrets.GITHUB_TOKEN}',
            'Accept': 'application/vnd.github.v3+json'
        }
        response = requests.get(url, headers=headers)
        response_data = response.json()
        file_sha = response_data['sha']
        data = {
            'message': 'Database Update',
            'content': encoded_content,
            'sha': file_sha,
            'branch': 'main'
        }
        requests.put(url, headers=headers, data=json.dumps(data))
        sorted_users = list(sorted(dlv_users.items(), key=lambda x: x[1]['xp'], reverse=True))
        sorted_users = {x[0]: x[1] for x in sorted_users}
        content = json.dumps(sorted_users)
        encoded_content = base64.b64encode(content.encode()).decode()
        url = f'https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvusers.json'
        headers = {
            'Authorization': f'token {secrets.GITHUB_TOKEN}',
            'Accept': 'application/vnd.github.v3+json'
        }
        response = requests.get(url, headers=headers)
        response_data = response.json()
        file_sha = response_data['sha']
        data = {
            'message': 'Database Update',
            'content': encoded_content,
            'sha': file_sha,
            'branch': 'main'
        }
        requests.put(url, headers=headers, data=json.dumps(data))
        sorted_packs = list(sorted(dlv_packs.items(), key=lambda x: x[1]['xp_value'], reverse=True))
        sorted_packs = {x[0]: x[1] for x in sorted_packs}
        content = json.dumps(sorted_packs)
        encoded_content = base64.b64encode(content.encode()).decode()
        url = f'https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvpacks.json'
        headers = {
            'Authorization': f'token {secrets.GITHUB_TOKEN}',
            'Accept': 'application/vnd.github.v3+json'
        }
        response = requests.get(url, headers=headers)
        response_data = response.json()
        file_sha = response_data['sha']
        data = {
            'message': 'Database Update',
            'content': encoded_content,
            'sha': file_sha,
            'branch': 'main'
        }
        requests.put(url, headers=headers, data=json.dumps(data))
        for i in dlv_list['main']:
            dlv_list['aredl_positions'][i] = aredl_data_full[dlv_list['og_case'][i]]['position']
            dlv_list['videos'][i] = dlv_aredl_videos[dlv_list['og_case'][i]]
            try:
                dlv_list['level_stats'][i]['object_count'] = str('{:,}'.format(int(dlv_list['level_stats'][i]['object_count'])))
            except Exception as error:
                pass
        for i in dlv_list['main']:
            if i not in list(dlv_list['thumbnails'].keys()):
                if requests.get('https://img.youtube.com/vi/' + get_yt_id(dlv_list['videos'][i]) + '/maxresdefault.jpg').status_code == 200:
                    dlv_list['thumbnails'][i] = {'url': 'https://img.youtube.com/vi/' + get_yt_id(dlv_list['videos'][i]) + '/maxresdefault.jpg', 'type': 'maxres'}
                else:
                    dlv_list['thumbnails'][i] = {'url': 'https://img.youtube.com/vi/' + get_yt_id(dlv_list['videos'][i]) + '/hqdefault.jpg', 'type': 'hq'}
        victors_dict = {}
        for i in dlv_list['main']:
            packs = []
            for b in list(dlv_packs.values()):
                if i in b['levels']:
                    packs.append(b['name'])
            dlv_list['packs'][i] = packs
            xp_amount = float(aredl_data_full[dlv_list['og_case'][i]]['points'])
            if 75 < int(aredl_data_full[dlv_list['og_case'][i]]['position']) < 151:
                xp_amount = xp_amount * 1.1
            if int(aredl_data_full[dlv_list['og_case'][i]]['position']) < 76:
                xp_amount = xp_amount * 1.25
            dlv_list['xp_values'][i] = xp_amount
            victors = []
            for e in list(dlv_users.values()):
                if e['user_id'] not in dlv_warn_saves:
                    dlv_warn_saves[e['user_id']] = []
                if i in e['completions']['main']:
                    victors.append([e['user_id'], e['username']])
            victors_dict[i] = victors
        dlv_list['victors'] = victors_dict
        list_dict = {}
        for i in list(dlv_packs.values()):
            dlv_packs[i['name']]['victors'] = []
        for i in list(dlv_users.values()):
            try:
                i['avatar_url'] = str(client.get_guild(1245200525037932565).get_member(int(i['user_id'])).avatar.url)
            except:
                pass
            if 'monthly_demons' not in list(i['completions'].keys()):
                dlv_users[i['user_id']]['completions']['monthly_demons'] = []
            if 'packs' not in list(i['completions'].keys()):
                dlv_users[i['user_id']]['completions']['packs'] = []
            verifications = []
            for e in i['completions']['main']:
                if dlv_list['verifiers'][e][0] == i['user_id']:
                    verifications.append(e)
            dlv_users[i['user_id']]['completions']['verifications'] = verifications
            completed_packs = []
            for z in list(dlv_packs.values()):
                completed_level_count = 0
                for y in z['levels']:
                    if y in i['completions']['main']:
                        completed_level_count += 1
                if completed_level_count == len(z['levels']):
                    completed_packs.append(z['name'])
                    dlv_packs[z['name']]['victors'].append([i['user_id'], i['username']])
            for b in completed_packs:
                if b not in list(dlv_packs.keys()):
                    completed_packs.remove(b)
            dlv_users[i['user_id']]['completions']['packs'] = completed_packs
        save()
        for e in dlv_list['main']:
            list_dict[e] = list(aredl_data_full.keys()).index(dlv_list['og_case'][e])
        sorted_list = list(sorted(list_dict.items(), key=lambda x: x[1], reverse=False))
        final_list = [y[0] for y in sorted_list]
        dlv_list['main'] = final_list
        save()
        for i in list(dlv_users.values()):
            if i['xp'] < 100:
                if i['xp'] < 25:
                    if i['xp'] != 0:
                        await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(1261051046588055555))
                elif i['xp'] < 50:
                    await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(1261051133288382475))
                elif i['xp'] < 75:
                    await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(1261051315841138760))
                else:
                    await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(1261051454429466674))
            completions_dict = {}
            for e in i['completions']['main']:
                if e in dlv_list['main']:
                    completions_dict[e] = dlv_list['main'].index(e)
            sorted_completions = list(sorted(completions_dict.items(), key=lambda x: x[1], reverse=False))
            final_completions = [y[0] for y in sorted_completions]
            dlv_users[i['user_id']]['completions']['main'] = final_completions
            completions_dict = {}
            for e in i['completions']['verifications']:
                if e in dlv_list['main']:
                    completions_dict[e] = dlv_list['main'].index(e)
            sorted_completions = list(sorted(completions_dict.items(), key=lambda x: x[1], reverse=False))
            final_completions = [y[0] for y in sorted_completions]
            dlv_users[i['user_id']]['completions']['verifications'] = final_completions
            completions_dict = {}
            for e in i['completions']['first_victors']:
                if e in dlv_list['main']:
                    completions_dict[e] = dlv_list['main'].index(e)
            sorted_completions = list(sorted(completions_dict.items(), key=lambda x: x[1], reverse=False))
            final_completions = [y[0] for y in sorted_completions]
            dlv_users[i['user_id']]['completions']['first_victors'] = final_completions
            xp_sum = 0
            for y in i['completions']['main']:
                xp_amount = float(aredl_data_full[dlv_list['og_case'][y]]['points'])
                if 75 < int(aredl_data_full[dlv_list['og_case'][y]]['position']) < 151:
                    xp_amount = xp_amount * 1.1
                if int(aredl_data_full[dlv_list['og_case'][y]]['position']) < 76:
                    xp_amount = xp_amount * 1.25
                if y in i['completions']['monthly_demons']:
                    xp_amount = xp_amount * 1.5
                xp_sum += xp_amount
            for c in i['completions']['packs']:
                xp_sum += dlv_packs[c]['xp_value']
            dlv_users[i['user_id']]['xp'] = xp_sum
            dlv_users[list(dlv_users.keys())[0]]['colors'] = dlv_list['colors']
            dlv_users[list(dlv_users.keys())[0]]['og_case'] = dlv_list['og_case']
            dlv_packs[list(dlv_packs.keys())[0]]['colors'] = dlv_list['colors']
            dlv_packs[list(dlv_packs.keys())[0]]['og_case'] = dlv_list['og_case']
            sorted_users = list(sorted(dlv_users.items(), key=lambda x: x[1]['xp'], reverse=True))
            sorted_users = {x[0]: x[1] for x in sorted_users}
            top_player = client.get_guild(1245200525037932565).get_member(int(list(sorted_users.values())[0]['user_id']))
            add_top_player_role = True
            for i in top_player.roles:
                if i.id == 1251257182121361530:
                    add_top_player_role = False
                    break
            if add_top_player_role:
                await top_player.add_roles(client.get_guild(1245200525037932565).get_role(1251257182121361530))
            for i in list(dlv_users.values()):
                user_xp = i['xp']
                user_rebirths = 0
                while user_xp > 9999:
                    user_xp = user_xp - 10000
                    user_rebirths += 1
                level = str(user_xp // 100).split('.')[0]
                update_level_role = True
                update_rebirth_role = True
                roman_numerals_dict = {0: '0', 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V'}
                try:
                    users = client.get_guild(1245200525037932565).get_member(int(i['user_id'])).roles
                except:
                    users = []
                for e in users:
                    if str(e.name).__contains__('Level') and not str(e.name) == f'Level {level}':
                        await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).remove_roles(client.get_guild(1245200525037932565).get_role(e.id))
                    if str(e.name) == f'Level {level}':
                        update_level_role = False
                        break
                    if str(e.name).__contains__('Rebirth') and not str(e.name) == f'Rebirth {roman_numerals_dict[user_rebirths]}':
                        await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).remove_roles(client.get_guild(1245200525037932565).get_role(e.id))
                    if str(e.name) == f'Rebirth {roman_numerals_dict[user_rebirths]}':
                        update_rebirth_role = False
                        break
                if update_level_role:
                    for x in client.get_guild(1245200525037932565).roles:
                        if str(x.name) == f'Level {level}':
                            await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(x.id))
                if update_rebirth_role:
                    for x in client.get_guild(1245200525037932565).roles:
                        if str(x.name) == f'Rebirth {roman_numerals_dict[user_rebirths]}':
                            await client.get_guild(1245200525037932565).get_member(int(i['user_id'])).add_roles(client.get_guild(1245200525037932565).get_role(x.id))
            for i in dlv_list['main']:
                dlv_list['videos'][i] = dlv_aredl_videos[dlv_list['og_case'][i]]
                try:
                    dlv_list['level_stats'][i]['object_count'] = str('{:,}'.format(int(dlv_list['level_stats'][i]['object_count'])))
                except Exception as error:
                    pass
            dlv_list['main'] = list(dict.fromkeys(dlv_list['main']))
            for i in list(dlv_users.values()):
                dlv_users[i['user_id']]['completions']['main'] = list(dict.fromkeys(i['completions']['main']))
                dlv_users[i['user_id']]['completions']['verifications'] = list(dict.fromkeys(i['completions']['verifications']))
                dlv_users[i['user_id']]['completions']['first_victors'] = list(dict.fromkeys(i['completions']['first_victors']))
            save()
        for i in client.get_guild(1245200525037932565).members:
            if str(i.id) not in list(dlv_users.keys()):
                dlv_users[str(i.id)] = {'username': str(i.name), 'user_id': str(i.id), 'avatar_url': str(i.avatar), 'completions': {'main': [], 'verifications': [], 'first_victors': [], 'monthly_demons': []}, 'xp': 0, 'dlvbucks': 0}
            save()
        print('Updated Stuff')
        await interaction.response.send_message(embed=discord.Embed(title='Success!', color=discord.Colour.green()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', color=discord.Colour.red()), ephemeral=True)

@tree.command(name='warn', description='Warn a user. Can only be used by admins')
async def warn(interaction: discord.Interaction, user: discord.Member, reason: str):
    if str(interaction.user.id) in admin_ids:
        if str(user.id) not in list(dlv_warn_saves.keys()):
            dlv_warn_saves[str(user.id)] = []
        dlv_warn_saves[str(user.id)].append({'id': len(dlv_warn_saves[str(user.id)]) + 1, 'reason': reason, 'user_id': str(user.id), 'username': str(user.name), 'mod_id': str(interaction.user.id), 'mod_username': str(interaction.user.name),
                                             'date': str(datetime.datetime.now()) + ' PST'})
        save()
        await user.send(embed=discord.Embed(title='You Have Been Warned In Demon List Verifications', description=f'Reason: {reason}', colour=discord.Colour.red()))
        await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Warned {str(user.name)}', colour=discord.Colour.blurple()))
    else:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', color=discord.Colour.red()), ephemeral=True)

@tree.command(name='warnlist', description="View a user's warnings. Can only be used by admins.")
async def warn_list(interaction: discord.Interaction, user: discord.Member):
    if str(interaction.user.id) in admin_ids:
        if str(user.id) not in list(dlv_warn_saves.keys()) or dlv_warn_saves[str(user.id)] == []:
            await interaction.response.send_message(embed=discord.Embed(title=f'{user.name} Has No Warnings (User ID: {str(interaction.user.id)})', colour=discord.Colour.blurple()))
            return
        warnings = ''
        for i in dlv_warn_saves[str(user.id)]:
            warnings += f'Warning ID: {i["id"]}\nWarning Reason: {i["reason"]}\nWarned By: {i["mod_username"]} ({i["mod_id"]})\nWarn Date: {i["date"]}\n\n'
        if warnings == '':
            warnings = 'No Warnings'
        await interaction.response.send_message(embed=discord.Embed(title=f"{user.name}'s Warnings (User ID: {str(interaction.user.id)})", description=f'{warnings}', colour=discord.Colour.blurple()))
    else:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', color=discord.Colour.red()), ephemeral=True)

@tree.command(name='warnremove', description='Remove a warning from a user. Can only be used by admins.')
async def warn_remove(interaction: discord.Interaction, warning_id: int):
    if str(interaction.user.id) in admin_ids:
        user_name = ''
        for i in list(dlv_warn_saves.keys()):
            for e in dlv_warn_saves[i]:
                if e['id'] == warning_id:
                    user_name = e['username']
                    dlv_warn_saves[i].remove(e)
                    break
        if user_name == '':
            await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Warning ID!', colour=discord.Colour.red()), ephemeral=True)
        save()
        await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Removed Warning {warning_id} From {user_name}!', colour=discord.Colour.green()))
    else:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', color=discord.Colour.red()), ephemeral=True)

@tree.command(name='monthlydemon', description='See the monthly demon.')
async def monthly_demon(interaction: discord.Interaction):
    if str(datetime.date.today().month) + '-' + str(datetime.date.today().year) not in list(dlv_monthly_demons.keys()):
        while True:
            random_demon = random.choice(list(aredl_data_full.keys()))
            if random_demon.lower() in dlv_list['main']:
                continue
            elif int(aredl_data_full[random_demon]['position']) < 500:
                continue
            elif random_demon in list(dlv_monthly_demons.values()):
                continue
            else:
                break
        dlv_monthly_demons[str(datetime.date.today().month) + '-' + str(datetime.date.today().year)] = random_demon
        save()
    demon = dlv_monthly_demons[str(datetime.date.today().month) + "-" + str(datetime.date.today().year)]
    await interaction.response.send_message(embed=discord.Embed(title=demon,
                                                                 description=f'The Monthly Demon For {str(datetime.date.today().strftime("%B"))}'
                                                                            f' {str(datetime.date.today().year)} Is '
                                                                            f'{demon}.\n\n**INFO:**\nAREDL Position: '
                                                                            f'#{str(aredl_data_full[demon]["position"])}\nXP Value: '
                                                                            f'{str(round(int(aredl_data_full[demon]["points"]) * 1.5))} (If Completed Within The Month, Otherwise {str(round(aredl_data_full[demon]["points"]))})\nLevel ID: '
                                                                             f'{str(aredl_data_full[demon]["level_id"])}\n\n*'
                                                                            f'A monthly demon is randomly generated every month. If completed within that month, they will grant 1.5x XP. Only levels below #500 on AREDL that '
                                                                            f'are not already on the list are eligible.*', colour=discord.Colour.red()))

@client.event
async def on_member_leave(member: discord.Member):
    dlv_left_members[str(member.id)] = dlv_users[str(member.id)]
    del dlv_users[str(member.id)]
    save()

@client.event
async def on_member_join(member: discord.Member):
    if str(member.id) in list(dlv_left_members.keys()):
        dlv_users[str(member.id)] = dlv_left_members[str(member.id)]
        del dlv_left_members[str(member.id)]
        save()

async def record_submit_command_autocompletion(interaction: discord.Interaction, current: str) -> typing.List[app_commands.Choice[str]]:
    data = []
    for demon_choice in list(aredl_data_full.keys()):
        if current.lower() in demon_choice.lower():
            data.append(app_commands.Choice(name=demon_choice, value=demon_choice))
    return data

@tree.command(name='slugstepreborn', description='drslug clubtepbron')
async def slugstepreborn(interaction: discord.Interaction):
    try:
        vc = await interaction.user.voice.channel.connect()
        vc.play(discord.FFmpegPCMAudio(source=r'C:\Users\Dani1\Downloads\videoplayback_-_Trim.mp3', executable=r'C:\Users\Dani1\Downloads\ffmpeg.exe'))
        while vc.is_playing():
            await asyncio.sleep(1)
        await vc.disconnect()
    except:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not In A Voice Channel!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='sonicslug', description='YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
async def sonicslug(interaction: discord.Interaction):
    try:
        vc = await interaction.user.voice.channel.connect()
        vc.play(discord.FFmpegPCMAudio(source=r'"C:\Users\Dani1\Downloads\sonic wave 100  after 8 deaths in the final wave. - Trim.mp3"', executable=r'C:\Users\Dani1\Downloads\ffmpeg.exe'))
        while vc.is_playing():
            await asyncio.sleep(1)
        await vc.disconnect()
    except:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not In A Voice Channel!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='addlistdemon', description='Add a demon to the list. Can only be used by admins.')
@app_commands.autocomplete(demon=record_submit_command_autocompletion)
async def add_list_demon(interaction: discord.Interaction, demon: str, color_hex_code: str, verifier: discord.Member):
    if str(interaction.user.id) in admin_ids:
        if demon in list(aredl_data_full.keys()):
            try:
                gd_level_id = aredl_data_full[demon]['level_id']
                level_search = await gda.search_level(str(gd_level_id))
                level = level_search[0]
            except Exception as error:
                print(error)  # So PyCharm Shuts Up
                await interaction.response.send_message(embed=discord.Embed(title='Invalid Level ID!', color=discord.Colour.red()), ephemeral=True)
                return  # So PyCharm Shuts Up
            if str(aredl_data_full[demon]['name']).lower() in dlv_list['main']:
                if dlv_name_to_id[str(aredl_data_full[demon]['name']).lower()] == str(level.id):
                    await interaction.response.send_message(embed=discord.Embed(title='Level Is Already on The List!', color=discord.Colour.red()), ephemeral=True)
            if color_hex_code.startswith('#') and len(color_hex_code) == 7:
                dlv_name_to_id[str(aredl_data_full[demon]['name']).lower()] = str(level.id)
                dlv_list['main'].append(str(aredl_data_full[demon]['name']).lower())
                dlv_list['colors'][str(aredl_data_full[demon]['name']).lower()] = color_hex_code
                dlv_list['victors'][str(aredl_data_full[demon]['name']).lower()] = {}
                dlv_list['verifiers'][str(aredl_data_full[demon]['name']).lower()] = [str(verifier.id), str(verifier.name)]
                dlv_list['victors'][str(aredl_data_full[demon]['name']).lower()][str(verifier.id)] = str(verifier.name)
                dlv_users[str(verifier.id)]['completions']['verifications'].append(str(aredl_data_full[demon]['name']).lower())
                dlv_users[str(verifier.id)]['completions']['main'].append(str(aredl_data_full[demon]['name']).lower())
                req = requests.get(f'https://api.aredl.net/api/aredl/levels/{dlv_name_to_id[str(aredl_data_full[demon]["name"]).lower()]}').json()
                xp_amount = float(req['points'])
                if 75 < int(req['position']) < 151:
                    xp_amount = xp_amount * 1.1
                if int(req['position']) < 76:
                    xp_amount = xp_amount * 1.25
                dlv_users[str(verifier.id)]['xp'] += xp_amount
                try:
                    copy_password = requests.get(f'https://api.aredl.net/api/aredl/levels/{str(level.id)}').json()['level_password']
                except Exception as error:
                    print(error)  # So PyCharm Shuts Up
                    copy_password = 'Not Copyable'
                copy_password = 'Not Copyable' if copy_password == 'No Copy' else 'Free Copy' if copy_password == 'Free to Copy' else copy_password
                dlv_list['level_stats'][str(aredl_data_full[demon]['name']).lower()] = {'level_id': str(level.id), 'publisher': str(level.author.name), 'level_length': str(level.length), 'song_name': str(level.songName), 'song_id': str(level.songID),
                                                                    'song_author': str(level.songAuthor), 'object_count': str(level.objects), 'copy_password': copy_password}
                dlv_list['og_case'][str(aredl_data_full[demon]['name']).lower()] = str(aredl_data_full[demon]['name'])
                save()
                try:
                    await on_message(client.get_channel(1248710289038246010).get_partial_message(1248722284458545244))
                except:
                    pass
                await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Added {str(aredl_data_full[demon]["name"])} To The List!',
                                                                            colour=discord.Colour.from_rgb(*hex_to_rgb(dlv_list['colors'][str(aredl_data_full[demon]['name']).lower()][1:7]))))
            else:
                await interaction.response.send_message(embed=discord.Embed(title='Invalid Hex Code!', color=discord.Colour.red()), ephemeral=True)
        else:
            await interaction.response.send_message(embed=discord.Embed(title='That Level Does Not Exist Or Is Not On AREDL.', colour=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', color=discord.Colour.red()), ephemeral=True)

async def completion_commands_autocompletion(interaction: discord.Interaction, current: str) -> typing.List[app_commands.Choice[str]]:
    data = []
    for demon_choice in list(dlv_list['og_case'].values()):
        if current.lower() in demon_choice.lower():
            data.append(app_commands.Choice(name=demon_choice, value=demon_choice))
    return data

@tree.command(name='changeverifier', description="Change a demon's verifier. Can only be used by admins.")
@app_commands.autocomplete(demon=completion_commands_autocompletion)
async def change_verifier(interaction: discord.Interaction, demon: str, new_verifier: discord.Member):
    if str(interaction.user.id) in admin_ids:
        if str(demon).lower() in dlv_list['main']:
            old_verifier = str(dlv_list['verifiers'][demon.lower()][1] + f' ({dlv_list["verifiers"][demon.lower()][0]})')
            dlv_list['verifiers'][demon.lower()] = [str(new_verifier.id), str(new_verifier.name)]
            save()
            await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Changed The Verifier Of {demon} From {old_verifier} to {str(new_verifier.name)} ({str(new_verifier.id)})!', color=discord.Colour.green()))
        else:
            await interaction.response.send_message(embed=discord.Embed(title='Invalid Demon Name!', color=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', color=discord.Colour.red()), ephemeral=True)

@tree.command(name='changecolor', description="Change a demon's color. Can only be used by admins.")
@app_commands.autocomplete(demon=completion_commands_autocompletion)
async def change_color(interaction: discord.Interaction, demon: str, new_color_hex_code: str):
    if str(interaction.user.id) in admin_ids:
        if str(interaction.user.id) == '543885678258290699' and demon == 'Silentium Gradas':
            await interaction.response.send_message('no')
            return
        if str(demon).lower() in dlv_list['main']:
            if new_color_hex_code.startswith('#') and len(new_color_hex_code) == 7:
                old_color_hex_code = str(dlv_list['colors'][demon.lower()])
                dlv_list['colors'][demon.lower()] = new_color_hex_code
                save()
                await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Changed The Color Of {dlv_list["og_case"][demon.lower()]}'
                                                                                  f' From {old_color_hex_code} to {new_color_hex_code}!', color=discord.Colour.from_rgb(*hex_to_rgb(new_color_hex_code[1:7]))))
            else:
                await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Color Hex Code!', colour=discord.Colour.red()), ephemeral=True)
        else:
            await interaction.response.send_message(embed=discord.Embed(title='Invalid Demon Name!', color=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', color=discord.Colour.red()), ephemeral=True)

@tree.command(name='removelistdemon', description='Remove a demon from the list. Can only be used by admins.')
@app_commands.autocomplete(demon=completion_commands_autocompletion)
async def remove_list_demon(interaction: discord.Interaction, demon: str):
    if str(interaction.user.id) in admin_ids:
        demon = demon.lower()
        demon_color = dlv_list['colors'][demon]
        og_case = dlv_list['og_case'][demon]
        if demon not in list(dlv_name_to_id.keys()):
            await interaction.response.send_message(embed=discord.Embed(title='Level Is Not On The List!', color=discord.Colour.red()), ephemeral=True)
        dlv_list['main'].remove(demon)
        del dlv_list['colors'][demon]
        del dlv_list['victors'][demon]
        del dlv_list['level_stats'][demon]
        del dlv_list['og_case'][demon]
        del dlv_name_to_id[demon]
        save()
        await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Removed {og_case} From The List!', color=discord.Colour.from_rgb(*hex_to_rgb(demon_color[1:7]))))
    else:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', color=discord.Colour.red()), ephemeral=True)

@tree.command(name='profile', description='Check yours or someone elses profile.')
async def xp(interaction: discord.Interaction, user: discord.Member=None):
    if user is None:
        user = interaction.user
    try:
        formatted_completions_list = [dlv_list['og_case'][x] for x in dlv_users[str(user.id)]['completions']['main']]
        formatted_completions = ''
        for i in formatted_completions_list:
            formatted_completions += i + '\n'
        if formatted_completions == '':
            formatted_completions = 'No Completions\n'
        formatted_verifications_list = [dlv_list['og_case'][x] for x in dlv_users[str(user.id)]['completions']['verifications']]
        formatted_verifications = ''
        for i in formatted_verifications_list:
            formatted_verifications += i + '\n'
        if formatted_verifications == '':
            formatted_verifications = 'No Verifications\n'
        color = discord.Colour.blurple()
        if formatted_completions != 'No Completions\n':
            color = discord.Colour.from_rgb(*hex_to_rgb(dlv_list['colors'][formatted_completions_list[0].lower()][1:7]))
        packs_dict = {}
        for i in dlv_users[str(user.id)]['completions']['packs']:
            packs_dict[i] = dlv_packs[i]['xp_value']
        print(packs_dict)
        sorted_packs = list(sorted(packs_dict.items(), key=lambda x: x[1], reverse=True))
        sorted_packs = {x[0]: x[1] for x in sorted_packs}
        sorted_packs = list(sorted_packs.keys())
        formatted_packs = ''
        for i in sorted_packs:
            formatted_packs += i + '\n'
        if formatted_packs == '':
            formatted_packs = 'No Packs\n'
        await interaction.response.send_message(embed=discord.Embed(title=f'**{user.name}**', description=f'**COMPLETIONS:**\n{formatted_completions}'
                                                                                                      f'\n**VERIFICATIONS:**\n{formatted_verifications}\n**COMPLETED PACKS:**\n{formatted_packs}\n'
                                                                                                      f'**LEVEL:**\n{str(dlv_users[str(user.id)]["xp"] // 100).split(".")[0]}\n\n**XP:**\n'
                                                                                                      f'{round(dlv_users[str(user.id)]["xp"], 1)}', colour=color))
    except Exception as error:
        print(error)  # So PyCharm Shuts Up
        await interaction.response.send_message(embed=discord.Embed(title=f'**{user.name}**', description=f'**COMPLETIONS:**\nNo Completions\n'
                                                                                                      f'\n**VERIFICATIONS:**\nNo Verifications\n\n**LEVEL:**\n'
                                                                                                      f'0\n\n**XP:**\n0', colour=discord.Colour.blurple()))

@tree.command(name='recordsubmit', description='Submit a record.')
@app_commands.autocomplete(demon=record_submit_command_autocompletion)
async def record_submit(interaction: discord.Interaction, demon: str, proof_link: str, additional_notes: str=None):
    if demon.lower() in aredl_all_demons:
        for i in list(dlv_records.values()):
            if i['user_id'] == str(interaction.user.id):
                if i['status'] in ['pending', 'accepted'] and i['demon'].lower() == demon.lower():
                    await interaction.response.send_message(embed=discord.Embed(title='You Have Already Completed/Submitted This Demon!', colour=discord.Colour.red()), ephemeral=True)
                    return
        if not demon.lower() in dlv_users[str(interaction.user.id)]['completions']['main']:
            record_review_channel = client.get_channel(1249167010105917440)
            record_id = ''
            while True:
                for i in range(10):
                    record_id += random.choice(string.ascii_letters + '12345678910')
                if record_id not in list(dlv_records.keys()):
                    break
            dlv_records[record_id] = {'record_id': record_id, 'user_id': str(interaction.user.id), 'username': str(interaction.user.name), 'demon': demon.lower(), 'proof_link': proof_link, 'additional_notes': additional_notes, 'status': 'pending',
                                      'reject_reason': None}
            save()
            await record_review_channel.send(embed=discord.Embed(title=f'Record Submitted By {str(interaction.user.name)} ({str(interaction.user.id)}) For {demon} ({aredl_data_full[demon]["level_id"]})',
                                                                 description=f'Proof Link: {proof_link}\nAdditional Notes: {additional_notes}\nRecord ID: {record_id}'))
            await interaction.response.send_message(embed=discord.Embed(title=f'Your Record For {demon} Has Been Submitted!', colour=discord.Colour.green()))
        else:
            await interaction.response.send_message(embed=discord.Embed(title='You Have Already Completed/Submitted This Demon!', colour=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title='That Level Does Not Exist Or Is Not On AREDL.', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='websitestatus', description='Check if the website is operational.')
async def website_status(interaction: discord.Interaction):
    await interaction.response.defer()
    try:
        if str(requests.get('https://api.cornboar.com/').json()) == 'Docs are at https://cornboar.com/apidocs/.':
            await interaction.followup.send(embed=discord.Embed(title='Fully Operational ✅', description="Try switching to mobile data if any part of the the account system doesn't load for over 10 seconds.", color=discord.Colour.green()))
        else:
            await interaction.followup.send(embed=discord.Embed(title='Operational Except Account System 😔', description='Should work again soon.', color=discord.Colour.red()))
    except:
        await interaction.followup.send(embed=discord.Embed(title='Operational Except Account System 😔', description='Should work again soon.', color=discord.Colour.red()))

@tree.command(name='recordaccept', description='Accept a record. Can only be used by admins.')
async def record_accept(interaction: discord.Interaction, record_id: str, color_hex_code: str=None):
    if str(interaction.user.id) in admin_ids:
            if record_id in list(dlv_records.keys()):
                if dlv_records[record_id]['status'] == 'pending':
                    if (str(interaction.user.id)) != dlv_records[record_id]['user_id']:
                        if dlv_records[record_id]['demon'].lower() in dlv_list['main']:
                            dlv_records[record_id]['status'] = 'accepted'
                            dlv_users[dlv_records[record_id]['user_id']]['completions']['main'].append(dlv_records[record_id]['demon'].lower())
                            if dlv_records[record_id]['demon'] == dlv_monthly_demons[str(datetime.date.today().month) + '-' + str(datetime.date.today().year)]:
                                dlv_users[dlv_records[record_id]['user_id']]['completions']['monthly_demons'].append(dlv_records[record_id]['demon'].lower())
                            req = requests.get(f'https://api.aredl.net/api/aredl/levels/{dlv_name_to_id[dlv_records[record_id]["demon"].lower()]}').json()
                            xp_amount = float(req['points'])
                            if 75 < int(req['position']) < 151:
                                xp_amount = xp_amount * 1.1
                            if int(req['position']) < 76:
                                xp_amount = xp_amount * 1.25
                            dlv_users[dlv_records[record_id]['user_id']]['xp'] += xp_amount
                            save()
                            await client.get_channel(1249167101235695727).send(f'<@{dlv_records[record_id]["user_id"]}>',
                                                                               embed=discord.Embed(title=f"{dlv_records[record_id]['username']}'s {dlv_list['og_case'][dlv_records[record_id]['demon']]} Record Has Been Accepted!",
                                                                                                   colour=discord.Colour.green()))
                            await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Accepted Record {record_id}!', colour=discord.Colour.green()))
                        else:
                            if color_hex_code is None:
                                await interaction.response.send_message(embed=discord.Embed(title=f'A Hex Code Is Required To Accept New Levels!', colour=discord.Colour.red()), ephemeral=True)
                                return
                            try:
                                aredl_data_full_new = {k.lower(): v for k, v in aredl_data_full.items()}
                                level_search = await gda.search_level(str(aredl_data_full_new[dlv_records[record_id]['demon']]["level_id"]))
                                level = level_search[0]
                            except Exception as error:
                                print(error)  # So PyCharm Shuts Up
                                await interaction.response.send_message(embed=discord.Embed(title='Invalid Level ID!', color=discord.Colour.red()), ephemeral=True)
                                return  # So PyCharm Shuts Up
                            if str(level.name).lower() in dlv_list['main']:
                                if dlv_name_to_id[str(level.name).lower()] == str(level.id):
                                    await interaction.response.send_message(embed=discord.Embed(title='Level Is Already on The List!', color=discord.Colour.red()), ephemeral=True)
                            if color_hex_code.startswith('#') and len(color_hex_code) == 7:
                                dlv_name_to_id[str(level.name).lower()] = str(level.id)
                                dlv_list['main'].append(str(level.name).lower())
                                dlv_list['colors'][str(level.name).lower()] = color_hex_code
                                dlv_list['victors'][str(level.name).lower()] = {}
                                dlv_list['verifiers'][str(level.name).lower()] = [dlv_records[record_id]['user_id'], dlv_records[record_id]['username']]
                                dlv_list['victors'][str(level.name).lower()][dlv_records[record_id]['user_id']] = dlv_records[record_id]['username']
                                dlv_users[dlv_records[record_id]['user_id']]['completions']['verifications'].append(str(level.name).lower())
                                dlv_users[dlv_records[record_id]['user_id']]['completions']['main'].append(str(level.name).lower())
                                req = requests.get(f'https://api.aredl.net/api/aredl/levels/{dlv_name_to_id[str(level.name).lower()]}').json()
                                xp_amount = float(req['points'])
                                if 75 < int(req['position']) < 151:
                                    xp_amount = xp_amount * 1.1
                                if int(req['position']) < 76:
                                    xp_amount = xp_amount * 1.25
                                dlv_users[dlv_records[record_id]['user_id']]['xp'] += xp_amount
                                try:
                                    copy_password = requests.get(f'https://api.aredl.net/api/aredl/levels/{str(level.id)}').json()['level_password']
                                except Exception as error:
                                    print(error)  # So PyCharm Shuts Up
                                    copy_password = 'Not Copyable'
                                copy_password = 'Not Copyable' if copy_password == 'No Copy' else 'Free Copy' if copy_password == 'Free to Copy' else copy_password
                                dlv_list['level_stats'][str(level.name).lower()] = {'level_id': str(level.id), 'publisher': str(level.author.name), 'level_length': str(level.length), 'song_name': str(level.songName), 'song_id': str(level.songID),
                                                                                    'song_author': str(level.songAuthor), 'object_count': str(level.objects), 'copy_password': copy_password}
                                dlv_list['og_case'][str(level.name).lower()] = str(level.name)
                                dlv_records[record_id]['status'] = 'accepted'
                                save()
                                try:
                                    await on_message(client.get_channel(1248710289038246010).get_partial_message(1248722284458545244))
                                except:
                                    pass
                                await client.get_channel(1249167101235695727).send(f'<@{dlv_records[record_id]["user_id"]}>',
                                                                                   embed=discord.Embed(title=f"{dlv_records[record_id]['username']}'s {dlv_list['og_case'][dlv_records[record_id]['demon']]} Record Has Been Accepted!",
                                                                                                       colour=discord.Colour.green()))
                                await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Accepted Record {record_id}!', colour=discord.Colour.green()))
                            else:
                                await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Color Hex Code!', colour=discord.Colour.red()), ephemeral=True)
                    else:
                        await interaction.response.send_message(embed=discord.Embed(title=f'You Cannot Accept Your Own Record!', colour=discord.Colour.red()), ephemeral=True)
                else:
                    await interaction.response.send_message(embed=discord.Embed(title=f'That record Has Already Been Accepted/Rejected!', colour=discord.Colour.red()), ephemeral=True)
            else:
                await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Record ID!', colour=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title=f'You Are Not An Admin!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='recordreject', description='Reject a record. Can only be used by admins.')
async def record_accept(interaction: discord.Interaction, record_id: str, reason: str):
    if str(interaction.user.id) in admin_ids:
        if record_id in list(dlv_records.keys()):
            if (str(interaction.user.id)) != dlv_records[record_id]['user_id']:
                dlv_records[record_id]['status'] = 'rejected'
                dlv_records[record_id]['reject_reason'] = reason
                save()
                await client.get_channel(1249167101235695727).send(f'<@{dlv_records[record_id]["user_id"]}>', embed=discord.Embed(
                                                                                       title=f"{dlv_records[record_id]['username']}'s {dlv_records[record_id]['demon'].title()} Record Has Been Rejected.", description=f'Reason: {reason}',
                                                                                       colour=discord.Colour.red()))
                await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Rejected Record {record_id}.', colour=discord.Colour.red()))
            else:
                await interaction.response.send_message(embed=discord.Embed(title=f'You Cannot Reject Your Own Record!', colour=discord.Colour.red()), ephemeral=True)
        else:
            await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Record ID!', colour=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title=f'You Are Not An Admin!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='createpack', description='Create a pack. Can only be used by admins.')
async def create_pack(interaction: discord.Interaction, pack_name: str):
    if str(interaction.user.id) in admin_ids:
        if pack_name not in list(dlv_packs.keys()):
            dlv_packs[pack_name] = {'name': pack_name, 'levels': [], 'victors': [], 'color': '', 'xp_value': 0}
            save()
            await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Created A Pack Called {pack_name}! Add Levels Using /addpacklevel.', colour=discord.Colour.green()))
        else:
            await interaction.response.send_message(embed=discord.Embed(title=f'A Pack With That Name Already Exists!', colour=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title=f'You Are Not An Admin!', colour=discord.Colour.red()), ephemeral=True)

async def pack_commands_autocompletion(interaction: discord.Interaction, current: str) -> typing.List[app_commands.Choice[str]]:
    data = []
    for pack_choice in list(dlv_packs.keys()):
        if current.lower() in pack_choice.lower():
            data.append(app_commands.Choice(name=pack_choice, value=pack_choice))
    return data

@tree.command(name='deletepack', description='Delete a pack. Can only be used by admins.')
@app_commands.autocomplete(pack_name=pack_commands_autocompletion)
async def delete_pack(interaction: discord.Interaction, pack_name: str):
    if str(interaction.user.id) in admin_ids:
        if pack_name in list(dlv_packs.keys()):
            del dlv_packs[pack_name]
            save()
            await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Deleted {pack_name}!', colour=discord.Colour.red()))
        else:
            await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Pack Name!', colour=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title=f'You Are Not An Admin!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='addpacklevel', description='Add a level to a pack. Can only be used by admins.')
@app_commands.autocomplete(pack=pack_commands_autocompletion)
@app_commands.autocomplete(demon=completion_commands_autocompletion)
async def add_pack_level(interaction: discord.Interaction, pack: str, demon: str):
    if str(interaction.user.id) in admin_ids:
        if pack in list(dlv_packs.keys()):
            if demon.lower() in dlv_list['main']:
                if demon.lower() not in dlv_packs[pack]['levels']:
                    dlv_packs[pack]['levels'].append(demon.lower())
                    save()
                    await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Added {demon} To {pack}!', colour=discord.Colour.green()))
                else:
                    await interaction.response.send_message(embed=discord.Embed(title=f'That Level Is Already In That Pack!', colour=discord.Colour.red()), ephemeral=True)
            else:
                await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Demon Name!', colour=discord.Colour.red()), ephemeral=True)
        else:
            await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Pack Name!', colour=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title=f'You Are Not An Admin!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='removepacklevel', description='Remove a level from a pack. Can only be used by admins.')
@app_commands.autocomplete(pack=pack_commands_autocompletion)
@app_commands.autocomplete(demon=completion_commands_autocompletion)
async def remove_pack_level(interaction: discord.Interaction, pack: str, demon: str):
    if str(interaction.user.id) in admin_ids:
        if pack in list(dlv_packs.keys()):
            if demon.lower() in dlv_list['main']:
                if demon.lower() in dlv_packs[pack]['levels']:
                    dlv_packs[pack]['levels'].remove(demon.lower())
                    save()
                    await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Removed {demon} From {pack}!', colour=discord.Colour.red()))
                else:
                    await interaction.response.send_message(embed=discord.Embed(title=f'That Level Is Not In That Pack!', colour=discord.Colour.red()), ephemeral=True)
            else:
                await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Demon Name!', colour=discord.Colour.red()), ephemeral=True)
        else:
            await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Pack Name!', colour=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title=f'You Are Not An Admin!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='packinfo', description='View information about a pack.')
@app_commands.autocomplete(pack=pack_commands_autocompletion)
async def create_pack(interaction: discord.Interaction, pack: str):
    if pack in list(dlv_packs.keys()):
        formatted_levels = ''
        for i in dlv_packs[pack]['levels']:
            formatted_levels += dlv_list['og_case'][i] + '\n'
        if formatted_levels == '':
            formatted_levels = 'This Pack Has No Levels\n'
        formatted_victors = ''
        for i in dlv_packs[pack]['victors']:
            formatted_victors += i[1] + '\n'
        if formatted_victors == '':
            formatted_victors = 'Nobody Has Completed This Pack\n'
        await interaction.response.send_message(embed=discord.Embed(title=f'**{pack}**', description=f'**LEVELS:**\n{formatted_levels}\n**XP VALUE:**\n{str(round(dlv_packs[pack]["xp_value"], 1))}\n\n**COMPLETED BY:**\n{formatted_victors}',
                                                                    colour=discord.Colour.from_rgb(*hex_to_rgb(dlv_packs[pack]['color'][1:7]))))
    else:
        await interaction.response.send_message(embed=discord.Embed(title=f'Invalid Pack Name!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='say', description='Make the bot say something.  Can only be used by admins.')
async def say(interaction: discord.Interaction, channel: discord.TextChannel, message: str):
    if str(interaction.user.id) in admin_ids:
        await channel.send(message)
        await interaction.response.send_message('Done', ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title=f'You Are Not An Admin!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='leaderboard', description='View the top 100 users.')
async def leaderboard(interaction: discord.Interaction):
    lb = ''
    sorted_users = list(sorted(dlv_users.items(), key=lambda x: x[1]['xp'], reverse=True))
    sorted_users = {x[0]: x[1] for x in sorted_users}
    user_number = 1
    for i in list(sorted_users.values()):
        lb += f'**#{str(user_number)}**. {i["username"]}: Level: {str(i["xp"] // 100).split(".")[0]}, XP: {str(round(i["xp"], 1))}\n'
        user_number += 1
    await interaction.response.send_message(embed=discord.Embed(title='**TOP 100 USERS**', description=lb, colour=discord.Colour.blurple()))

@tree.command(name='generatekey', description='Generate a key for the admin website. Can only be used by admins.')
async def generate_key(interaction: discord.Interaction):
    if str(interaction.user.id) in admin_ids:
        dlv_keys['main'] = ''
        for i in range(10):
            dlv_keys['main'] += random.choice(string.ascii_letters + '12345678910')
        save()
        await interaction.response.send_message(embed=discord.Embed(title=f'Your Key Is: {dlv_keys["main"]}', description='This key will be valid until you generate a new one. '
                                                                                                                          '(Whatever you need to do you can do on the bot so probably do that cause the admin website might be broken 😭)',
                                                                    colour=discord.Colour.green()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title=f'You Are Not An Admin!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='demoninfo', description="View a demon's info.")
@app_commands.autocomplete(demon=completion_commands_autocompletion)
async def victors_command(interaction: discord.Interaction, demon: str):
    demon = demon.lower()
    if demon in dlv_list['main']:
        victors = ''
        for i in dlv_list['victors'][demon]:
            victors += i[1] + '\n'
        xp_amount = dlv_list['xp_values'][demon.lower()]
        formatted_info = f'**POSITION:**\n#{dlv_list["main"].index(demon) + 1}\n\n**VERIFIER:**\n{dlv_list["verifiers"][demon][1]}\n\n**VICTORS:**\n{victors}\n**LEVEL STATS**:\nLevel ID: {dlv_list["level_stats"][demon]["level_id"]}\n' \
                         f'Publisher: {dlv_list["level_stats"][demon]["publisher"]}\nLevel Length: {dlv_list["level_stats"][demon]["level_length"]}\nSong: {dlv_list["level_stats"][demon]["song_name"]} ' \
                         f'({dlv_list["level_stats"][demon]["song_id"]}) By ' \
                         f'{dlv_list["level_stats"][demon]["song_author"]}\nObject Count: {dlv_list["level_stats"][demon]["object_count"]}\nCopy Password: {dlv_list["level_stats"][demon]["copy_password"]}\n\n**XP VALUE:**\n{str(round(xp_amount, 1))}'
        await interaction.response.send_message(embed=discord.Embed(title=f'**{dlv_list["og_case"][demon]}**', description=formatted_info, colour=discord.Colour.from_rgb(*hex_to_rgb(dlv_list['colors'][demon].strip('#')))))
    else:
        await interaction.response.send_message(embed=discord.Embed(title='Invalid Demon Name!', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='addcompletion', description='Add a completion to a user. Can only be used by admins.')
@app_commands.autocomplete(demon=completion_commands_autocompletion)
async def add_completion_command(interaction: discord.Interaction, user: discord.Member, demon: str):
    if str(interaction.user.id) in admin_ids:
        if str(interaction.user.id) in ['543885678258290699', '991443322516279466', '863876735031836702']:
            if str(interaction.user.id) != str(user.id):
                if demon.lower() not in dlv_list['main']:
                    await interaction.response.send_message(embed=discord.Embed(title='Invalid Level Name!', colour=discord.Colour.red()), ephemeral=True)
                    return
                if demon.lower() in dlv_users[str(user.id)]['completions']['main']:
                    await interaction.response.send_message(embed=discord.Embed(title='That User Has Already Completed That Demon!', colour=discord.Colour.red()), ephemeral=True)
                    return
                dlv_list['victors'][str(user.id)] = str(user.name)
                dlv_users[str(user.id)]['completions']['main'].append(demon.lower())
                dlv_users[str(user.id)]['completions']['first_victors'].append(demon.lower())
                req = requests.get(f'https://api.aredl.net/api/aredl/levels/{dlv_name_to_id[demon.lower()]}').json()
                xp_amount = float(req['points'])
                if 75 < int(req['position']) < 151:
                    xp_amount = xp_amount * 1.1
                if int(req['position']) < 76:
                    xp_amount = xp_amount * 1.25
                dlv_users[str(user.id)]['xp'] += xp_amount
                save()
                eeee = "'"
                await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Added {dlv_list["og_case"][demon.lower()]} To {str(user.name) + eeee}s Completions!', colour=discord.Colour.green()))
            else:
                await interaction.response.send_message(embed=discord.Embed(title='You Cannot Edit Your Own Completions!', colour=discord.Colour.red()), ephemeral=True)
        else:
            await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', colour=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', color=discord.Colour.red()), ephemeral=True)

@tree.command(name='removecompletion', description='Remove a completion from a user. Can only be used by admins.')
@app_commands.autocomplete(demon=completion_commands_autocompletion)
async def remove_completion_command(interaction: discord.Interaction, user: discord.Member, demon: str):
    if str(interaction.user.id) in admin_ids:
        if str(interaction.user.id) != str(user.id):
            if demon.lower() in dlv_users[str(user.id)]['completions']['main']:
                if demon.lower() not in dlv_list['main']:
                    await interaction.response.send_message(embed=discord.Embed(title='Invalid Level Name!', colour=discord.Colour.red()), ephemeral=True)
                    return
                dlv_users[str(user.id)]['completions']['main'].remove(demon.lower())
                if demon.lower() in dlv_users[str(user.id)]['completions']['verifications']:
                    dlv_users[str(user.id)]['completions']['verifications'].remove(demon.lower())
                if demon.lower() in dlv_users[str(user.id)]['completions']['first_victors']:
                    dlv_users[str(user.id)]['completions']['first_victors'].remove(demon.lower())
                req = requests.get(f'https://api.aredl.net/api/aredl/levels/{dlv_name_to_id[demon.lower()]}').json()
                xp_amount = float(req['points'])
                if 75 < int(req['position']) < 151:
                    xp_amount = xp_amount * 1.1
                if int(req['position']) < 76:
                    xp_amount = xp_amount * 1.25
                dlv_users[str(user.id)]['xp'] -= xp_amount
                save()
                eeee = "'"
                await interaction.response.send_message(embed=discord.Embed(title=f'Successfully Removed {dlv_list["og_case"][demon.lower()]} From {str(user.name) + eeee}s Completions!', colour=discord.Colour.green()))
            else:
                await interaction.response.send_message(embed=discord.Embed(title='That User Has Not Completed That Demon.', colour=discord.Colour.red()), ephemeral=True)
        else:
            await interaction.response.send_message(embed=discord.Embed(title='You Cannot Edit Your Own Completions!', colour=discord.Colour.red()), ephemeral=True)
    else:
        await interaction.response.send_message(embed=discord.Embed(title='You Are Not An Admin!', color=discord.Colour.red()), ephemeral=True)

@tree.command(name='demonlist', description='Displays the Demon List.')
async def demon_list_command(interaction: discord.Interaction):
    formatted_list = ''
    for i in dlv_list['main']:
            formatted_list += f'**{dlv_list["main"].index(i) + 1}**. {dlv_list["og_case"][i]}\n'
    await interaction.response.send_message(embed=discord.Embed(title='Demon List', description=formatted_list, colour=discord.Colour.from_rgb(*hex_to_rgb(dlv_list['colors'][dlv_list['main'][0]].strip('#')))))

class connect_account_prompt(discord.ui.Modal, title='Connect Account'):
    email = discord.ui.TextInput(label='Email Address:', style=discord.TextStyle.paragraph)
    password = discord.ui.TextInput(label='Password:', style=discord.TextStyle.paragraph)
    async def on_submit(self, interaction: discord.Interaction):
        try:
            print(str(self.email))
            print(list(dlv_accounts.keys()))
            if str(self.email) in list(dlv_accounts.keys()):
                if str(self.password) == dlv_accounts[str(self.email)]['password']:
                    if dlv_accounts[str(self.email)]['verified']:
                        if not dlv_accounts[str(self.email)]['discord_account_id']:
                            dlv_accounts[str(self.email)]['discord_account_id'] = str(interaction.user.id)
                            save()
                            await interaction.response.send_message(embed=discord.Embed(title='Successfully Connected Your Account!', colour=discord.Colour.green()))
                        else:
                            class disconnect_account_button(discord.ui.View):
                                email = str(self.email)
                                @discord.ui.button(label=f'Disconnect "{dlv_accounts[str(self.email)]["discord_account_id"]}"', style=discord.ButtonStyle.red)
                                async def disconnect_account_button(self, button_press: discord.Interaction, button: discord.ui.Button):
                                    print(button)  # So PyCharm Shuts Up
                                    dlv_accounts[str(self.email)]['discord_account_id'] = None
                                    save()
                                    await button_press.response.send_message(embed=discord.Embed(title='Successfully Disconnected Account', colour=discord.Colour.green()), ephemeral=True)

                            await interaction.response.send_message(embed=discord.Embed(title='This Account Already Has A Discord Account Connected To It', colour=discord.Colour.red()), ephemeral=True, view=disconnect_account_button())
                    else:
                        await interaction.response.send_message(embed=discord.Embed(title='Account Is Not Verified', colour=discord.Colour.red()), ephemeral=True)
                else:
                    await interaction.response.send_message(embed=discord.Embed(title='Invalid Password', colour=discord.Colour.red()), ephemeral=True)
            else:
                await interaction.response.send_message(embed=discord.Embed(title='Invalid Email', colour=discord.Colour.red()), ephemeral=True)
        except Exception as error:
            print(error)  # So PyCharm shuts up
            await interaction.response.send_message(embed=discord.Embed(title='Error', description='An Error Occured', colour=discord.Colour.red()), ephemeral=True)

@tree.command(name='connectaccount', description='Connect your Discord account to your DLV account.')
async def link_account_command(interaction: discord.Interaction):
    await interaction.response.send_modal(connect_account_prompt())

@client.event
async def on_ready():
    await tree.sync()
    print('Ready!')

client.run(secrets.BOT_TOKEN)
