import React, { useState } from "react";
import { Box, Heading, Text, Input, Textarea, Button, Stack, Grid, GridItem, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editTask, setEditTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTask) {
      const updatedTasks = tasks.map((task) => (task.id === editTask.id ? { ...task, title, description } : task));
      setTasks(updatedTasks);
      setEditTask(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        file: selectedFile,
      };
      setTasks([...tasks, newTask]);
    }
    setTitle("");
    setDescription("");
    setSelectedFile(null);
    onClose();
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setTitle(task.title);
    setDescription(task.description);
    onOpen();
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        My Daily Task Diary App
      </Heading>

      <Box textAlign="right" marginBottom={4}>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
          Add Task
        </Button>
      </Box>

      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
        {tasks.map((task) => (
          <GridItem key={task.id} borderWidth={1} borderRadius="md" padding={4}>
            <Heading as="h3" size="md" marginBottom={2}>
              {task.title}
            </Heading>
            <Text marginBottom={4}>{task.description}</Text>
            {task.file && (
              <Text fontSize="sm" color="gray.500">
                Attached File: {task.file.name}
              </Text>
            )}
            <Stack direction="row" spacing={2} marginTop={4}>
              <IconButton icon={<FaEdit />} aria-label="Edit Task" onClick={() => handleEdit(task)} />
              <IconButton icon={<FaTrash />} aria-label="Delete Task" onClick={() => handleDelete(task.id)} />
            </Stack>
          </GridItem>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editTask ? "Edit Task" : "Add Task"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <Input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                <Button type="submit" colorScheme="blue">
                  {editTask ? "Update Task" : "Add Task"}
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
