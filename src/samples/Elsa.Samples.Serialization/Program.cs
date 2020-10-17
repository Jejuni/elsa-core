﻿using System;
using System.Threading.Tasks;
using Elsa.Activities.Console;
using Elsa.Expressions;
using Elsa.Models;
using Elsa.Scripting.Liquid.Services;
using Elsa.Serialization;
using Elsa.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Elsa.Samples.Serialization
{
    class Program
    {
        static async Task Main(string[] args)
        {
            // Create a service container with Elsa services.
            var services = new ServiceCollection()
                .AddElsa()
                .AddConsoleActivities()
                .BuildServiceProvider();
            
            // Run startup actions (not needed when registering Elsa with a Host).
            var startupRunner = services.GetRequiredService<IStartupRunner>();
            await startupRunner.StartupAsync();
            
            // Define a workflow.
            var workflowDefinition = new WorkflowDefinition
            {
                WorkflowDefinitionId = "SampleWorkflow",
                WorkflowDefinitionVersionId = "1", 
                Version = 1,
                IsPublished = true,
                IsLatest = true,
                IsEnabled = true,
                PersistenceBehavior = WorkflowPersistenceBehavior.Suspended,
                Activities = new[]
                {
                    new ActivityDefinition
                    {
                        Id = "activity-1",
                        Type = nameof(WriteLine),
                        Properties = new ActivityDefinitionProperties
                        {
                            [nameof(WriteLine.Text)] = new ActivityDefinitionPropertyValue
                            {
                                Syntax = LiquidExpressionHandler.SyntaxName,
                                Expression = "Hello World!",
                                Type = typeof(string)
                            }
                        }
                    }, 
                }
            };
            
            // Serialize workflow definition to JSON.
            var serializer = services.GetRequiredService<IJsonSerializer>();
            var json = serializer.Serialize(workflowDefinition);
            
            Console.WriteLine(json);
            
            // Deserialize workflow definition from JSON.
            var deserializedWorkflowDefinition = serializer.Deserialize<WorkflowDefinition>(json);
            
            // Materialize workflow.
            var materializer = services.GetRequiredService<IWorkflowBlueprintMaterializer>();
            var workflowBlueprint = materializer.CreateWorkflowBlueprint(deserializedWorkflowDefinition);
            
            // Execute workflow.
            var workflowHost = services.GetRequiredService<IWorkflowHost>();
            await workflowHost.RunWorkflowAsync(workflowBlueprint);
        }
    }
}