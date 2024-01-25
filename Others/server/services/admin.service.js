const { Admin } = require('../models/admin.model')
class AdminService {
    // 添加管理员
    addAdmin(admin) {
        // 1. 验证是否符合model格式
        // 2. 验证是否已经存在

        return Admin.create(admin ?? {
            loginId: 'admin',
            loginPwd: 'admin',
            name: '管理员',
        })
        const ins = Admin.build(admin ?? {
            loginId: 'admin',
            loginPwd: 'admin',
            name: '管理员',
        })
        return ins.save()
    }
    // 删除管理员
    deleteAdmin(id) {
        return Admin.destroy({
            where: {
                id
            }
        })
    }
    // 更新管理员
    updateAdmin(admin) {
        return Admin.update(admin, {
            where: {
                id: admin.id
            }
        })
    }
}

module.exports = new AdminService