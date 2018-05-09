/* 每个页面的中 alert的信息介绍 */
const alert = {

    '/invite/send': {
        title: "发起邀约",
        description: "您可以筛选出感兴趣的学校，点击邀约按钮，填写您希望的演讲时间和演讲主题等内容发起邀约，这些内容可以在之后的沟通中修改。发起的邀约会进入左侧菜单中的“已发起邀约”列表，发起邀约后您可以对邀约进行进一步的沟通处理。",
        type: "warning",
        state: true
    },

    '/invite/over': {
        title: "已发起邀约",
        description: "这里会显示出您发起的邀约，您可以通过留言功能与学校沟通，并使用修改功能修改演讲主题、演讲时间等信息，直到您和学校达成一致。学校一方可以对您发起的邀约进行同意处理，同意的邀约会进入左侧菜单的“进行中”列表，途梦的工作人员会处理进一步的演讲事宜。被拒绝的邀约会进入左侧菜单中的“被拒绝”列表中。",
        type: "warning",
        state: true
    },

    '/invite/received': {
        title: "收到的邀约",
        description: "这里会显示出您从学校收到的邀约，您可以通过留言功能与学校沟通，学校作为邀约提出方有权限对邀约信息进行修改。您可以对邀约进行同意和拒绝操作，同意的邀约会进入左侧菜单的“进行中”列表，途梦的工作人员会处理进一步的演讲事宜。",
        type: "warning",
        state: true
    },

    '/underway': {
        title: "进行中",
        description: "这里会显示出即将安排演讲的邀约，途梦工作人员会与您联系处理演讲事宜。",
        type: "warning",
        state: true
    },

    '/done': {
        title: "已完成",
        description: "这里会显示出已经完成演讲的邀约。",
        type: "warning",
        state: true
    },

    '/refused': {
        title: "被拒绝",
        description: "这里会显示出被学校拒绝的邀约，您可以查看拒绝原因。",
        type: "warning",
        state: true
    },

    '/refuse': {
        title: "我拒绝",
        description: "这里会显示出您拒绝的邀约，您可以查看拒绝原因。",
        type: "warning",
        state: true
    },

    '/invite/all': {
        title: "全部邀约",
        description: "这里会显示出所有的邀约。",
        type: "warning",
        state: true
    },
}

module.exports = {
    pageInfo(path, attr) {
        return alert[path][attr];
    }
}
