module.exports = (sequelize, DataTypes) => {
    const Focus = sequelize.define('Focus', {
    StudentID: DataTypes.INTEGER,
    total_points: DataTypes.NUMBER,
    points_acquired: DataTypes.NUMBER,
    rules_video_link: DataTypes.STRING,
    focus_local: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
              args: [['CASA', 'BAIRRO', 'ESCOLA', 'OUTRO']],
              msg: "Local do foco não é válido"
            }
        }
    },
    focus_local_optional: DataTypes.STRING,
    focus_type: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
              args: [['LATAS', 'PNEUS', 'BEBEDOUROS', 'VASOS', 'CALHAS', 'PISCINAS', 'RESERVATÓRIOS', 'LIXO', 'BANDEIJAS', 'POÇAS', 'OUTROS']],
              msg: "Tipo de foco não é válido"
            }
        }
    },
    focus_type_optional: DataTypes.STRING,
    solution: DataTypes.STRING,
    commentary: DataTypes.STRING,
    GPS_coordinates: DataTypes.STRING,
    feedback: DataTypes.STRING,
    status: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
              args: [['APROVADO']],
              msg: "Tipo não é válido"
            }
        }
    },
    createdAt: {
        field: 'created_at',
            type: DataTypes.DATE,
       },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    }  
    });
    
    return Focus;
  };