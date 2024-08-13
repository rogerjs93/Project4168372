import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaTimes } from 'react-icons/fa';

const SkillsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Skill = styled.span`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SkillEditor = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const SkillInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const AddSkillButton = styled.button`
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
`;

const SkillsSection = ({ skills = [], onUpdateSkills }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      onUpdateSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onUpdateSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <SkillsWrapper>
      <SkillList>
        {skills && skills.map((skill, index) => (
          <Skill key={index}>
            {skill}
            <FaTimes onClick={() => handleRemoveSkill(skill)} style={{ cursor: 'pointer' }} />
          </Skill>
        ))}
      </SkillList>
      <SkillEditor>
        <SkillInput
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a new skill"
        />
        <AddSkillButton onClick={handleAddSkill}>
          <FaPlus />
        </AddSkillButton>
      </SkillEditor>
    </SkillsWrapper>
  );
};

export default SkillsSection;