import { expect, test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
})

test.describe('cadastro', () => {
    test('deve poder cadastrar uma nova tarefa', async ({ request }) => {
        const task = data.sucess as TaskModel

        await deleteTaskByHelper(request, task.name)

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.shouldHaveText(task.name)
    })

    test('não deve permitir tarefa duplicada', async ({ request }) => {
        const task = data.duplicate as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.alertHaveText('Task already exists!')
    })

    test('campo obrigatório', async () => {
        const task = data.required as TaskModel

        await tasksPage.go()
        await tasksPage.create(task)

        const validationMessage = await tasksPage.inputTaskName.evaluate(
            e => (e as HTMLInputElement).validationMessage
        )
        expect(validationMessage).toEqual('This is a required field')
    })

    test('deve exibir a tarefa na lista após cadastro', async ({ request }) => {
        const task = data.sucess as TaskModel

        await deleteTaskByHelper(request, task.name)

        await tasksPage.go()
        const countBefore = await tasksPage.getTaskCount()

        await tasksPage.create(task)
        await tasksPage.shouldHaveText(task.name)

        const countAfter = await tasksPage.getTaskCount()
        expect(countAfter).toBe(countBefore + 1)
    })

    test('deve aceitar tarefa com caracteres especiais', async ({ request }) => {
        const task = data.specialChars as TaskModel

        await deleteTaskByHelper(request, task.name)

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.shouldHaveText(task.name)
    })
})

test.describe('atualização', () => {
    test('deve concluir uma tarefa', async ({ request }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.toggle(task.name)
        await tasksPage.shouldBeDone(task.name)
    })

    test('deve poder reabrir uma tarefa concluída', async ({ request }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.toggle(task.name)
        await tasksPage.shouldBeDone(task.name)

        await tasksPage.toggle(task.name)
        const target = tasksPage.page.getByText(task.name)
        await expect(target).not.toHaveCSS('text-decoration-line', 'line-through')
    })
})

test.describe('exclusão', () => {
    test('deve excluir uma tarefa', async ({ request }) => {
        const task = data.delete as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.remove(task.name)
        await tasksPage.shouldNotExist(task.name)
    })

    test('não deve exibir tarefa excluída na lista', async ({ request }) => {
        const task = data.delete as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        const countBefore = await tasksPage.getTaskCount()

        await tasksPage.remove(task.name)
        await tasksPage.shouldNotExist(task.name)

        const countAfter = await tasksPage.getTaskCount()
        expect(countAfter).toBe(countBefore - 1)
    })
})
