const imageModel = (sequelize, Sequelize) => {
    const Image = sequelize.define('image', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        folderId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'folder', // Self-referencing
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        },
        subFolderId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'folder', // Self-referencing
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        },
        filePath: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        fileType: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Foreign key reference to the 'user' model
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        },
    }, {
        timestamps: true,  // Automatically manage createdAt and updatedAt
        tableName: 'image',  // Specify the table name
        charset: 'utf8mb4',  // Character set
        collate: 'utf8mb4_0900_ai_ci',  // Collation
    });

    // Associations
    Image.associate = function(models) {
        // Association with User model
        Image.belongsTo(models.user, {
            foreignKey: 'createdBy',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });

        // Self-referencing association (for parent folders)
        Image.belongsTo(models.folder, {
            as: 'parentFolder',
            foreignKey: 'folderId',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });

        // Self-referencing association for sub-folders
        Image.hasMany(models.folder, {
            as: 'subFolders',
            foreignKey: 'subFolderId',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    };

    return Image;
};

export default imageModel;
